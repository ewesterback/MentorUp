const { User } = require('../models')
const middleware = require('../middleware')

const Login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
      raw: true
    })
    if (
      user &&
      (await middleware.comparePassword(user.passwordDigest, req.body.password))
    ) {
      let payload = {
        id: user.id,
        email: user.email
      }
      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    throw error
  }
}

const Register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      availableToMentor,
      state,
      linkedin,
      photo,
      bio,
      passions,
      currentTitle,
      currentCompany,
      yearsInIndustry
    } = req.body
    let passwordDigest = await middleware.hashPassword(password)
    let userBody = {
      firstName,
      lastName,
      email,
      passwordDigest,
      availableToMentor,
      state,
      linkedin,
      photo,
      bio,
      passions,
      currentTitle,
      currentCompany,
      yearsInIndustry
    }
    const user = await User.create(userBody)
    res.send(user)
  } catch (error) {
    console.log(error.message)
    if (error.message === 'Validation error') {
      return res
        .status(400)
        .send({ status: 'Error', msg: 'Email already in use' })
    }
    throw error
  }
}

const FindAllUsers = async (req, res) => {
  try {
    let users = await User.findAll({
      where: { availableToMentor: 1 }
    })
    res.send(users)
  } catch (error) {
    throw error
  }
}

const FindUserFromToken = async (req, res) => {
  try {
    //const userId = 1
    const userId = parseInt(res.locals.payload.id)
    let user = await User.findAll({
      where: { id: userId },
      attributes: ['id', 'firstName', 'lastName']
    })
    res.send(user)
  } catch (error) {
    throw error
  }
}
const FindUserFromTokenReturnAll = async (req, res) => {
  try {
    const userId = parseInt(res.locals.payload.id)
    let user = await User.findAll({
      where: { id: userId }
    })
    res.send(user)
  } catch (error) {
    throw error
  }
}

const FindEmail = async (req, res) => {
  try {
    let savedEmail = req.params.new_email
    let user = await User.findAll({
      where: { email: savedEmail },
      attributes: ['id']
    })
    res.send(user)
  } catch (error) {
    throw error
  }
}

module.exports = {
  Login,
  Register,
  FindAllUsers,
  FindUserFromToken,
  FindUserFromTokenReturnAll,
  FindEmail
}
