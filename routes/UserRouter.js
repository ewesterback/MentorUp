const router = require('express').Router()
const controller = require('../controllers/UserController')
const middleware = require('../middleware')

router.post('/login', controller.Login)
router.post('/register', controller.Register)
router.get('/load', controller.FindAllUsers)
router.get(
  '/token',
  middleware.stripToken,
  middleware.verifyToken,
  controller.FindUserFromToken
)
router.get(
  '/token/all',
  middleware.stripToken,
  middleware.verifyToken,
  controller.FindUserFromTokenReturnAll
)
router.get('/email/:new_email', controller.FindEmail)

module.exports = router
