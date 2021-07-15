import { React, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { LoadMentors, SelectMentor } from '../store/actions/MentorActions'
import { Input, Button } from 'react-rainbow-components'

const mapStateToProps = ({ mentorState }) => {
  return { mentorState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadMentors: () => dispatch(LoadMentors()),
    setSelectedMentor: (mentor) => dispatch(SelectMentor(mentor))
    // handleLoginInput: (input) => dispatch(StageLogin(input))
  }
}

const MentorCard = (props) => {
  const onClick = (mentor) => {
    console.log(props)
    props.setSelectedMentor(mentor)
    props.history.push(`/mentors/${mentor.id}`)
  }

  return (
    <div className="mentor-card">
      <p>mentors</p>
      <p>{props.mentor.firstName}</p>
      <p>{props.mentor.lastName}</p>
      <p>{props.mentor.field}</p>
      <Button
        label="Learn More"
        variant="brand"
        onClick={() => onClick(props.mentor)}
      />
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(MentorCard)
