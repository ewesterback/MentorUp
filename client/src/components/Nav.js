import { React, useEffect } from 'react'
import { NavLink, Route, Switch, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { LoadMentors, SelectMentor } from '../store/actions/MentorActions'
import { SetAuth } from '../store/actions/LoginActions'
import { Input, Button } from 'react-rainbow-components'

const mapStateToProps = ({ loginState }) => {
  return { loginState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAuth: (bool) => dispatch(SetAuth(bool))
    // handleLoginInput: (input) => dispatch(StageLogin(input))
  }
}

const Nav = (props) => {
  const history = useHistory()

  const onLogout = () => {
    localStorage.clear()
    props.setAuth(false)
    history.push('/')
  }

  return (
    <div className="nav-bar">
      {props.loginState.authenticated ? (
        <div className="nav-links">
          <NavLink className="nav-link" to="/mentors">
            Look for a Mentor
          </NavLink>
          <NavLink className="nav-link" to="/messages">
            Messages
          </NavLink>
          <button onClick={onLogout}>Logout</button>
        </div>
      ) : null}
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(Nav)
