const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const SECRET = process.env.SECRET || 'changeme'
const EXPIRE = process.env.TOKEN_EXPIRATION_MINUTES || 60
const expiredUsers = 'testUser'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, default: 'unguessable password' },
  userValid: { type: Boolean, default: true }
})

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 5)
  }
})

userSchema.methods.generateToken = function () {
  const tokenData = {
    id: this._id,
    username: this.username,
    issueTime: Date.now(),
    isValid: this.userValid,
  }
  // console.log('tokenData.exp',tokenData.exp)
  //generate token
  return jwt.sign(tokenData, SECRET, { expiresIn: '1h'})
}

userSchema.statics.authenticateBasic = function (username, password) {
  return this.findOne({ username })
    .then(result => result && result.comparePassword(password))
    .catch(console.error)
}

// build token for bearer auth validation method here 
// static on class vs instance
userSchema.statics.authenticateToken = async function (token) {
  try {
    // verify and decode token
    const tokenObject = jwt.verify(token, SECRET)
    // console.log('verified tokenObject',tokenObject)
    if (!tokenObject.username) {
      return Promise.reject(new Error('Token is malformed'))
    }
    // reject token if userValid in token doesn't match in db
    // this.Schema

    if (true) {
      // console.log('user id',currentUser)
      // console.log('dbUSer',dbUser)
    }
    const user = await this.findOne({ username: tokenObject.username })
    return user
  } catch (error) {
    return Promise.reject(error)
  }
}

userSchema.methods.comparePassword = function (password) {
  // Compare a given password against the stored hashed password
  // If it matches, return the user instance, otherwise return null
  return bcrypt.compare(password, this.password)
    .then(valid => valid ? this : null)
    .catch(console.error)
}

module.exports = mongoose.model('User', userSchema)
