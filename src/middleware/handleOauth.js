const superagent = require('superagent')
const User = require('../models/users')

const TOKEN_SERVER_URL = 'https://github.com/login/oauth/access_token'
const CLIENT_ID = 'abafc20a153ff19f78b4'
const CLIENT_SECRET = process.env.GITHUB_APP_CLIENT_SECRET
const API_SERVER = 'http://localhost:3000/oauth'
const REMOTE_API_ENDPOINT = 'https://api.github.com/user'

async function exchangeCodeForToken (code) {
  const response = await superagent
    .post(TOKEN_SERVER_URL)
    .send({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: code,
      redirect_uri: API_SERVER,
      state: 'this is unguessable! mwahahaha'
    })
  return response.body.access_token
}

async function getRemoteUsername (token) {
  const response = await superagent
    .get(REMOTE_API_ENDPOINT)
    .set('Authorization', `token ${token}`)
    .set('user-agent', 'express-app')
  return response.body.login
}

async function getUser (username) {
  const user = await User.findOneAndUpdate({ username }, { username }, { new: true, upsert: true })
  const token = user.generateToken()
  return [user, token]
}

async function handleOauth (req, res, next) {
  try {
    const { code } = req.query
    console.log('(1) CODE:', code)
    const remoteToken = await exchangeCodeForToken(req.query.code)
    console.log('(2) ACCESS TOKEN:', remoteToken)
    const remoteUsername = await getRemoteUsername(remoteToken)
    console.log('(3) GITHUB USER:', remoteUsername)
    const [user, token] = await getUser(remoteUsername)
    req.user = user
    req.token = token
    console.log('(4a) LOCAL USER:', user)
    console.log('(4b) USER\'S TOKEN:', token)
    next()
  } catch (err) {
    next(`ERROR: ${err.message}`)
  }
}

module.exports = handleOauth
