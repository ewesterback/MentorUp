import { React, useEffect } from 'react'
//import { Route, Switch, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
// import // UnselectMentor,
// // LoadUserFromToken
// '../store/actions/MentorActions'
import {
  StageMessage,
  CreateNewMessageGivenThread,
  DeleteMessageGivenId,
  StageEditMessage,
  ToggleEditMessage,
  EditGivenMessage
} from '../store/actions/MessageActions'
import { Input, Button } from 'react-rainbow-components'
import moment from 'moment'

const mapStateToProps = ({ mentorState, messageState }) => {
  return { mentorState, messageState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleMessage: (content) => dispatch(StageEditMessage(content)),
    sendEditMessage: (body) => dispatch(EditGivenMessage(body)),
    deleteMessage: (messageId) => dispatch(DeleteMessageGivenId(messageId)),
    toggleEditMessage: (id) => dispatch(ToggleEditMessage(id))
  }
}

const MessageCard = (props) => {
  const handleInput = (e) => {
    props.handleMessage(e.target.value)
  }
  //handle send message
  const onUpdate = (e) => {
    e.preventDefault()
    let body = { ...props.message }
    body.content = props.messageState.editMessageContent
    props.sendEditMessage(body)
    props.toggleEditMessage(null)
    props.handleMessage('')
  }
  const onDelete = (id) => {
    props.deleteMessage(id)
  }
  const onSelectEdit = (id) => {
    props.toggleEditMessage(id)
    props.handleMessage(props.message.content)
  }
  const onCancel = (e) => {
    e.preventDefault()
    props.toggleEditMessage(null)
    props.handleMessage('')
  }
  return (
    <div
      className={
        props.message.User.id === props.mentorState.user.id
          ? 'sender-message'
          : 'recipient-message'
      }
    >
      {props.messageState.editMessage == props.message.id ? (
        <div>
          <Input
            onChange={handleInput}
            value={props.messageState.editMessageContent}
          />
          <Button label="Update" onClick={onUpdate} />
          <Button label="Cancel" onClick={onCancel} />
        </div>
      ) : (
        <div>
          <p
            className={
              props.message.User.id === props.mentorState.user.id
                ? 'sender-message-content'
                : 'recipient-message-content'
            }
          >
            {props.message.content}
          </p>
          <p>
            {moment(props.message.updatedAt).format(
              'dddd, MMMM Do YYYY, h:mm:ss a'
            )}
          </p>
          {props.message.User.id === props.mentorState.user.id ? (
            <div>
              <Button
                label="Delete"
                onClick={() => {
                  onDelete(props.message.id)
                }}
              />
              <Button
                label="Edit"
                onClick={() => onSelectEdit(props.message.id)}
              />
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(MessageCard)
