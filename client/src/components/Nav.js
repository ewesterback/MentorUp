import { React } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { SetAuth } from '../store/actions/LoginActions'

const mapStateToProps = ({ loginState }) => {
  return { loginState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAuth: (bool) => dispatch(SetAuth(bool))
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
          <p className="nav-link"> | </p>
          <NavLink className="nav-link" to="/messages">
            Messages
          </NavLink>
          <p className="nav-link"> | </p>
          <p className="nav-link" onClick={onLogout}>
            Logout
          </p>
        </div>
      ) : (
        <p className="nav-link">MentorUp</p>
      )}
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(Nav)
