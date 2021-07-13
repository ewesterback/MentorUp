const router = require('express').Router()
const controller = require('../controllers/MessageController')

router.post(
  '/create',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateMessage
)
router.delete('/:message_id', controller.DeleteMessage)
//router.get('/all', controller.FindAllBarbers)
router.get('/id/:message_id', controller.FindMessagesByThread)

module.exports = router
