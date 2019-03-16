const {
  MongoClient,
  ObjectID
} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log('Unable to connect to database!')
  }
  const db = client.db(databaseName)

  // db.collection('users').deleteMany({
  //   age: 26
  // }).then((r) => {
  //   console.log(r)
  // }).catch((err) => {
  //   console.log(err)
  // })

  db.collection('tasks').deleteOne({
    _id: new ObjectID("5c7d7de472a2722e7ae801a8")
  }).then((r) => {
    console.log(r)
  }).catch((err) => {
    console.log(r)
  })

  // db.collection('users')
})
