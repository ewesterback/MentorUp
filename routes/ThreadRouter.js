const router = require('express').Router()
const controller = require('../controllers/ThreadController')
const middleware = require('../middleware')

router.post(
  '/:mentor_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateThread
)
// ADD COMMENTED LINE BACK IN
// router.delete(
//   '/:thread_id',
//   middleware.stripToken,
//   middleware.verifyToken,
//   controller.DeleteThread
// )
router.delete('/:thread_id', controller.DeleteThread)
router.get('/id/:thread_id', controller.FindThreadById)
router.get(
  '/user',
  middleware.stripToken,
  middleware.verifyToken,
  controller.FindThreadByUserId
)
router.get(
  '/mentor/:mentor_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.FindThreadByUserIdMentorId
)
// router.put(
//   '/:review_id',
//   middleware.stripToken,
//   middleware.verifyToken,
//   controller.UpdateReview
// )
module.exports = router
