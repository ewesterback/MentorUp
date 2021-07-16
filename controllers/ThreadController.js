const { Thread, User, Message } = require('../models')
const { Op } = require('sequelize')

const CreateThread = async (req, res) => {
  try {
    let mentorID = parseInt(req.params.mentor_id)
    console.log('--------------------')
    console.log(mentorID)
    console.log(res.locals.payload.id)
    console.log('----------------------')
    let threadBody = {
      mentorId: mentorID,
      menteeId: res.locals.payload.id
    }
    const thread = await Thread.create(threadBody)
    // const user = await User.findAll({
    //   where: { id: threadBody.menteeId }
    // })
    // let newThread = {
    //   ...thread.dataValues,
    //   User: { firstName: user[0].firstName, lastName: user[0].lastName }
    // }
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
      [Op.or]: [
        {
          where: { mentorID: userId }
        },
        {
          where: { menteeId: userId }
        }
      ]
    })
    //for each thread, find messages, limit 1, order by creation date, include user
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

// const reviews = await Review.findAll({
//   [Op.and]: [
//     {[Op.or]: [
//       {
//         where: { mentorID: userId }
//       },
//       {
//         where: { menteeId: userId }
//       }
//     ]},
//     {[Op.or]: [
//       {
//         where: { mentorID: mentorID }
//       },
//       {
//         where: { menteeId: mentorID }
//       }
//     ]}
//   ]
// })

module.exports = {
  CreateThread,
  DeleteThread,
  FindThreadById,
  FindThreadByUserId,
  FindThreadByUserIdMentorId
}
