import { React, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { LoadMentors } from '../store/actions/MentorActions'
import { Input, Button } from 'react-rainbow-components'
import MentorCard from '../components/MentorCard'

const mapStateToProps = ({ mentorState }) => {
  return { mentorState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadMentors: () => dispatch(LoadMentors())
    // setAuth: (bool) => dispatch(SetAuth(bool)),
    // handleLoginInput: (input) => dispatch(StageLogin(input))
  }
}

const Mentors = (props) => {
  // const getToken = () => {
  //   let token = localStorage.getItem('token')
  //   console.log(token)
  //   if (token) {
  //     return props.setAuth(true)
  //   }
  // }
  useEffect(() => {
    props.loadMentors()
  }, [])
  console.log(props.mentorState)
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
