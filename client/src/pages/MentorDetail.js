import { React, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { UnselectMentor } from '../store/actions/MentorActions'
import { Input, Button } from 'react-rainbow-components'
import MentorCard from '../components/MentorCard'

const mapStateToProps = ({ mentorState }) => {
  return { mentorState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    unselectMentor: () => dispatch(UnselectMentor())
    // setAuth: (bool) => dispatch(SetAuth(bool)),
    // handleLoginInput: (input) => dispatch(StageLogin(input))
  }
}

const MentorDetail = (props) => {
  console.log('hi!')
  // const getToken = () => {
  //   let token = localStorage.getItem('token')
  //   console.log(token)
  //   if (token) {
  //     return props.setAuth(true)
  //   }
  // }
  // useEffect(() => {
  //   props.loadMentors()
  // }, [])

  // console.log(props.mentorState)
  // const mappedMentors = props.mentorState.mentors.map((mentor, i) => (
  //   <MentorCard mentor={mentor} key={i} />
  // ))
  const onClick = () => {
    props.unselectMentor()
    props.history.push(`/mentors`)
  }
  return (
    <div className="mentor-detail-page">
      <Button label="Go Back to Mentor Search" onClick={onClick} />
      <div className="mentor-detail">
        <p>mentor details</p>
        <p>{props.mentorState.selectedMentor.firstName}</p>
      </div>
      <div className="messaging-pane">
        <p>load messages here</p>
      </div>
      <p>mentors</p>
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(MentorDetail)
