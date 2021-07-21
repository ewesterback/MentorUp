import { React, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { SetAuth } from '../store/actions/LoginActions'
import { Input, Button } from 'react-rainbow-components'
import EntryPoint from './EntryPoint'
import Profile from './Profile'
import Mentors from './Mentors'

const mapStateToProps = ({ loginState }) => {
  return { loginState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAuth: (bool) => dispatch(SetAuth(bool))
  }
}

const HomePage = (props) => {
  console.log(props.loginState)
  return (
    <div className="home-page">
      {props.loginState.authenticated ? (
        <Mentors {...props} />
      ) : (
        <EntryPoint {...props} />
      )}
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
