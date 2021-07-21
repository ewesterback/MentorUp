const { Thread, User, Message } = require('../models')
const { Op } = require('sequelize')

const CreateThread = async (req, res) => {
  try {
    let mentorID = parseInt(req.params.mentor_id)
    let threadBody = {
      mentorId: mentorID,
      menteeId: res.locals.payload.id
    }
    const thread = await Thread.create(threadBody)
    res.send(thread)
  } catch (error) {
    throw error
  }
}
const DeleteThread = async (req, res) => {
  try {
    let threadId = parseInt(req.params.thread_id)
    await Thread.destroy({ where: { id: threadId } })
    res.send({ message: `Deleted thread with an id of ${threadId}` })
  } catch (error) {
    throw error
  }
}

const FindThreadById = async (req, res) => {
  try {
    let threadId = parseInt(req.params.thread_id)
    const thread = await Thread.findByPk(threadId)
    res.send(thread)
  } catch (error) {
    throw error
  }
}
const FindThreadByUserId = async (req, res) => {
  try {
    let userId = parseInt(res.locals.payload.id)
    const threads = await Thread.findAll({
      where: {
        [Op.or]: [{ mentorId: userId }, { menteeId: userId }]
      },
      include: [
        { model: User, as: 'mentor' },
        { model: User, as: 'mentee' }
      ]
    })
    //for each thread, find messages, limit 1, order by creation date, include user
    for (let i = 0; i < threads.length; i++) {
      let threadId = threads[i].id
      let message = await Message.findAll({
        where: { threadId: threadId },
        include: [{ model: User }],
        limit: 1,
        order: [['createdAt', 'DESC']]
      })
      threads[i] = { ...threads[i].dataValues, message: message[0] }
    }
    res.send(threads)
  } catch (error) {
    throw error
  }
}
const FindThreadByUserIdMentorId = async (req, res) => {
  try {
    console.log('made it to thread controller')
    let userId = parseInt(res.locals.payload.id)
    let mentorId = parseInt(req.params.mentor_id)
    const threads = await Thread.findAll({
      where: {
        [Op.and]: [
          { [Op.or]: [{ mentorId: userId }, { menteeId: userId }] },
          { [Op.or]: [{ mentorId: mentorId }, { menteeId: mentorId }] }
        ]
      }
    })
    //could load in all messages here since only one thread
    res.send(threads)
  } catch (error) {
    throw error
  }
}

module.exports = {
  CreateThread,
  DeleteThread,
  FindThreadById,
  FindThreadByUserId,
  FindThreadByUserIdMentorId
}
