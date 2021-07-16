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

module.exports = router
