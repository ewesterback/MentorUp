const router = require('express').Router()
const UserRouter = require('./UserRouter')
const ThreadRouter = require('./ThreadRouter')
const MessageRouter = require('./MessageRouter')

router.use('/user', UserRouter)
router.use('/thread', ThreadRouter)
router.use('/message', MessageRouter)

module.exports = router
