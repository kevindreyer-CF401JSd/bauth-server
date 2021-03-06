const express = require('express')
const authRouter = express.Router()

const User = require('../models/users');
const basicAuth = require('../middleware/basicAuth');
const bearerAuth = require('../middleware/bearerAuth');

authRouter.post('/signup', (req, res, next) => {
  // expects the user sent a req body with username and password
  // take that username and password and make a new user with it
  const user = new User(req.body)
  // console.log('req ----------------', req)
  user.save()
    .then(result => res.status(200).json({ token: user.generateToken()}))
    .catch(next)
})

authRouter.post('/signin', basicAuth, (req, res, next) => {
  res.status(200).json({ token: req.token })
})

authRouter.get('/users', async (req, res, next) => {
  // send all users
  
  const allUsers = await User.find({})
  res.status(200).json(allUsers)
})

//Add route with middleware for bearerauth
authRouter.get('/supersecret', bearerAuth, async (req, res, next) => {
  // console.log('req.user',req.user)
  console.log('req.user.id',req.user.id)
  // const dbUser = await User.find(req.user.id)
  // console.log('dbUser',dbUser)
  res.status(200).json([{ username: req.user.username, userValid: req.user.userValid }])
})

const handleOauth = require('../middleware/handleOauth')
authRouter.get('/oauth', handleOauth, (req, res, next) => {
  res.status(200).json({ message: 'signed in with oauth' })
})

module.exports = authRouter
