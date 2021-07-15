const router = require('express').Router()
const controller = require('../controllers/ThreadController')
const middleware = require('../middleware')

router.post(
  '/create',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateThread
)
router.delete(
  '/:thread_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteThread
)
//router.get('/all', controller.FindAllReviews)
router.get('/id/:thread_id', controller.FindThreadById)
router.get(
  '/user',
  middleware.stripToken,
  middleware.verifyToken,
  controller.FindThreadByUserId
)
// router.put(
//   '/:review_id',
//   middleware.stripToken,
//   middleware.verifyToken,
//   controller.UpdateReview
// )
module.exports = router
