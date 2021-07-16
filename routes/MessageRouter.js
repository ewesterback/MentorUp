const router = require('express').Router()
const controller = require('../controllers/MessageController')
const middleware = require('../middleware')

router.post(
  '/create',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateMessage
)
router.delete('/:message_id', controller.DeleteMessage)
router.get('/id/:thread_id', controller.FindMessagesByThread)

module.exports = router
