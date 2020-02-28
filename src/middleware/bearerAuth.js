// middleware to validate token in res
const User = require('../models/users');

async function bearerAuth (req, res, next) {
  // check for authorization in req header
  if (!req.headers.authorization) {
    next(new Error('No authorization in header'))
  }
  // get user from db
  // console.log('req.headers',req.headers)
  // const dbUser = await User.find(req.user.id)

  // get the token in the auth header so it can be verified
  const token = req.headers.authorization.split(' ').pop();

  User.authenticateToken(token)
    .then(valid => {
      req.user = valid
      next()
    })
    .catch(err => {
      next(err)
    })
}

module.exports = bearerAuth;