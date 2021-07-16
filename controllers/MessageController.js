const { Message } = require('../models')

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
    res.send(message)
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

const FindMessagesByThread = async (req, res) => {
  console.log('yooooooooooooo')
  try {
    console.log(req.params.thread_id)
    console.log('thread Id')
    let threadId = parseInt(req.params.thread_id)
    const messages = await Message.findAll({ where: { threadId: threadId } })
    res.send(messages)
  } catch (error) {
    throw error
  }
}

module.exports = {
  CreateMessage,
  DeleteMessage,
  FindMessagesByThread
}
