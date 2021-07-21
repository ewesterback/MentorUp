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
    props.setSelectedMentor(mentor)
    props.history.push(`/mentors/${mentor.id}`)
  }

  return (
    <div className="mentor-card">
      <div className="top-bar"></div>
      <img className="mentor-card-image" src={props.mentor.photo} />
      <div className="content">
        <h3>
          {props.mentor.firstName} {props.mentor.lastName}
        </h3>
        {!props.mentor.currentCompany || !props.mentor.currentTitle ? (
          <p>
            {props.mentor.currentCompany}
            {props.mentor.currentTitle}
          </p>
        ) : (
          <p>
            {props.mentor.currentCompany} | {props.mentor.currentTitle}
          </p>
        )}
        <button onClick={() => onClick(props.mentor)}>Learn More</button>
      </div>
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(MentorCard)
