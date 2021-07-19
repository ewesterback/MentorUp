import { React, useEffect } from 'react'
import { NavLink, Route, Switch, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { LoadMentors, SelectMentor } from '../store/actions/MentorActions'
import { Input, Button } from 'react-rainbow-components'

const mapStateToProps = ({ mentorState, loginState }) => {
  return { mentorState, loginState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadMentors: () => dispatch(LoadMentors()),
    setSelectedMentor: (mentor) => dispatch(SelectMentor(mentor))
    // handleLoginInput: (input) => dispatch(StageLogin(input))
  }
}

const Nav = (props) => {
  return (
    <div className="mentor-card">
      {props.loginState.authenticated ? (
        <div>
          <NavLink className="nav-link" to="/mentors">
            Look for a Mentor
          </NavLink>
          <NavLink className="nav-link" to="/messages">
            Messages
          </NavLink>
        </div>
      ) : (
        <p>hi</p>
      )}
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(Nav)
