import { React, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { LoadMentors, LoadUserFromToken } from '../store/actions/MentorActions'
import { Input, Button } from 'react-rainbow-components'
import MentorCard from '../components/MentorCard'

const mapStateToProps = ({ mentorState }) => {
  return { mentorState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadMentors: () => dispatch(LoadMentors()),
    setUser: () => dispatch(LoadUserFromToken())
    // setAuth: (bool) => dispatch(SetAuth(bool)),
    // handleLoginInput: (input) => dispatch(StageLogin(input))
  }
}

const Mentors = (props) => {
  useEffect(() => {
    props.loadMentors()
    props.setUser()
  }, [])
  const mappedMentors = props.mentorState.mentors.map((mentor, i) => (
    <MentorCard mentor={mentor} key={i} {...props} />
  ))
  return (
    <div className="mentor-page">
      <p>mentors</p>
      {mappedMentors}
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(Mentors)
