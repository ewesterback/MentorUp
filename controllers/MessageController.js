const { Message, User } = require('../models')

const CreateMessage = async (req, res) => {
  console.log('here')
  try {
    const { threadId, content } = req.body

    let messageBody = {
      threadId,
      content,
      userId: res.locals.payload.id
    }
    const message = await Message.create(messageBody)
    userId = message.userId
    let user = await User.findAll({
      where: { id: userId },
      attributes: ['id', 'firstName', 'lastName']
    })
    newMessage = { ...message.dataValues, User: user[0] }
    res.send(newMessage)
  } catch (error) {
    throw error
  }
}
const DeleteMessage = async (req, res) => {
  try {
    let messageId = parseInt(req.params.message_id)
    await Message.destroy({ where: { id: messageId } })
    res.send({ message: `Deleted message with an id of ${messageId}` })
  } catch (error) {
    throw error
  }
}
const EditMessage = async (req, res) => {
  try {
    let messageId = parseInt(req.params.message_id)
    let body = req.body
    let user = body.User
    let message = await Message.update(body, {
      where: { id: messageId },
      returning: true
    })
    res.send(message)
  } catch (error) {
    throw error
  }
}

const FindMessagesByThread = async (req, res) => {
  try {
    let threadId = parseInt(req.params.thread_id)
    const messages = await Message.findAll({
      where: { threadId: threadId },
      include: [{ model: User }]
    })
    res.send(messages)
  } catch (error) {
    throw error
  }
}

module.exports = {
  CreateMessage,
  DeleteMessage,
  FindMessagesByThread,
  EditMessage
}
