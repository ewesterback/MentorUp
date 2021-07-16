import { React, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { UnselectMentor } from '../store/actions/MentorActions'
import {
  FindThreadByMentor,
  FindMessagesByThread,
  UnselectThread,
  StageMessage,
  CreateNewThreadWithNewMessage,
  CreateNewMessageGivenThread
} from '../store/actions/MessageActions'
import { Input, Button } from 'react-rainbow-components'

const mapStateToProps = ({ mentorState, messageState }) => {
  return { mentorState, messageState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    unselectMentor: () => dispatch(UnselectMentor()),
    findThreads: (id) => dispatch(FindThreadByMentor(id)),
    loadMessages: (threadId) => dispatch(FindMessagesByThread(threadId)),
    unselectThread: () => dispatch(UnselectThread()),
    handleMessage: (content) => dispatch(StageMessage(content)),
    createNewThreadWithNewMessage: (mentorId, content) =>
      dispatch(CreateNewThreadWithNewMessage(mentorId, content)),
    createNewMessageGivenThread: (threadId, content) =>
      dispatch(CreateNewMessageGivenThread(threadId, content))
  }
}

const Profile = (props) => {
  //functions

  return (
    <div className="profile-page">
      <p>profile page</p>
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
