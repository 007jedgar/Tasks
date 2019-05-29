# A Task API
###### A simple api I built to learn MongoDB.
**API:** built with Node, Express, Mongoose (MongoDB), JWT & Bcrypt (auth)

## Features
**Create account:** uses JWT and bcrypt for auth and allows for profile pic upload
 
**CRUD Tasks:** uses mongoose to make mongodb operations

## Setup
##### Prerequisites
* MongoDB Installed locally and a MongoDB Account
* Node version > 8

 
#### Installation
* Clone repo
* Add a `dev.env` file to the project root with the following:
```
PORT=3000
SENDGRID_API_KEY=YOUR_SENDGRID_API_KEY
JWT_SECRET=YOUR_JWT_SECRET
MONGODB_URL=YOUR_MONGODB_URL
```
* Start local mongodb server (optional)
* `$ npm i`
* `$ npm start`

## Usage
###### I suggest using something like Postman where environment variables and post-run (test) scripts can be set up. Here's is an example of my test script after signing/logging in.

```
if (pm.response.code === 201) {
    pm.environment.set('authToken', pm.response.json().token)
}
```

##### `localhost:3000/`

 
#### (Un)complete list of routes:

#### GET
`/users/me`
`/users/:id/avatar`
`/tasks`
`/tasks/:taskId`
#### POST
`/users`
`/users/signup`
`/users/login`
`/users/logoutAll`
`/users/logout`
`/users/me/avatar`
`/tasks`
#### PATCH
`/users/me`
`/tasks/:taskId`

#### DELETE
`/users/me/avatar`
`/users/me`
`/tasks/:taskId`

#### User Object

Property | Type | Required | Description
-------- | ---- | -------- |  ------------
name    | String | True | The name of the user is trimmed upon input.
email | String | True | The email of the user is trimmed, lowercased, and unique.
password| String | True | Min length is 7 and is trimmed
age | Number | False | Default is 0 and must be positive number upon input
tokens | [`token`] | False | Array of auth tokens created through authentication.
avatar | Buffer | False | A buffer of an image file (jpeg, jpg, png)

#### Task Object

Property | Type | Required | Description
-------- | ---- | -------- |  ------------
description    | String | True | The description of the user is trimmed upon input.
completed | Boolean | False | Default is false
owner| Mongoose ObjectId | True | Has a reference of `User`. Uses the current authenticated user
