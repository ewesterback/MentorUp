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
  // const getToken = () => {
  //   let token = localStorage.getItem('token')
  //   if (token) {
  //     return props.setAuth(true)
  //   }
  // }
  // //set authenication again if user refreshed page
  // useEffect(() => {
  //   getToken()
  // }, [])

  const onLogout = () => {
    localStorage.clear()
    props.setAuth(false)
  }

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
          <Button label="logout" onClick={onLogout} />
        </div>
      ) : (
        <p>hi</p>
      )}
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(Nav)