const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

router.post('/tasks', auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  })

  try {
    await task.save()
    res.status(201).send(task)
  } catch(err) {
    res.status(500).send()
  }
})

router.get('/tasks', auth, async (req, res) => {
  let match = {}
  let sort = {}
  if (req.query.completed) {
    match.completed = req.query.completed === 'true'
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc'? -1 : 1
  }

  try {
    await req.user.populate({
      path: 'tasks',
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
      }
    }).execPopulate()

    res.status(200).send(req.user.tasks)
  } catch(err) {
    res.status(500).send()
  }
})

router.get('/tasks/:taskId', auth, async (req, res) => {
  let _id = req.params.taskId

  try {
    const task = await Task.findOne({ _id, owner: req.user._id })
    if (!task) {
      return res.status(404).send()
    }

    res.status(200).send(task)
  } catch(err) {
    res.status(500).send()
  }
})


router.patch('/tasks/:taskId', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['completed', 'description']
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update)
  })

  if (!isValidOperation) {
    return res.status(400).send({ Error: 'Invalid Update!'})
  }

  let taskId = req.params.taskId
  try {
    const task = await Task.findOne({ _id: taskId, owner: req.user._id })
    if (!task) {
      return res.status(404).send({ Error: 'Task was not found'})
    }

    updates.forEach((update) => {
      task[update] = req.body[update]
    })
    await task.save()

    res.send(task)
  } catch(err) {
    res.status(500).send(err)
  }
})

router.delete('/tasks/:taskId', auth, async (req, res) => {
  const taskId = req.params.taskId

  try {
    let task = await Task.findOneAndDelete({ _id: taskId, owner: req.user._id })
    if (!task) {
      return res.status(404).send({ Error: 'Task does not exist' })
    }

    res.send(task)
  } catch(err) {
    res.status(500).send(err)
  }
})

module.exports = router
