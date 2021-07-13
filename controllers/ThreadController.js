const { Thread, User } = require('../models')
const { Op } = require('sequelize')

const CreateThread = async (req, res) => {
  try {
    const { mentorID } = req.body

    let threadBody = {
      mentorID,
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
// const FindAllReviews = async (req, res) => {
//   try {
//     let reviews = await Review.findAll({
//       include: [{ model: User, attributes: ['firstName', 'lastName'] }],
//       order: [['createdAt', 'DESC']]
//     })
//     res.send(reviews)
//   } catch (error) {
//     throw error
//   }
// }
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
    const reviews = await Review.findAll({
      [Op.or]: [
        {
          where: { mentorID: userId }
        },
        {
          where: { menteeId: userId }
        }
      ]
    })
    res.send(reviews)
  } catch (error) {
    throw error
  }
}

// const UpdateReview = async (req, res) => {
//   try {
//     let reviewId = parseInt(req.params.review_id)
//     req.body.userId = parseInt(res.locals.payload.id)
//     let review = await Review.update(req.body, {
//       where: { id: reviewId },
//       returning: true
//     })
//     res.send(review)
//   } catch (error) {
//     throw error
//   }
// }

module.exports = {
  CreateThread,
  DeleteThread,
  //FindAllThreads,
  FindThreadById,
  FindThreadByUserId
  //UpdateReview
}
