import { React, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  RegisterUser,
  SetAuth,
  StageLogin
} from '../store/actions/LoginActions'
import { Input, Button } from 'react-rainbow-components'

const mapStateToProps = ({ loginState }) => {
  return { loginState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (input) => dispatch(RegisterUser(input)),
    setAuth: (bool) => dispatch(SetAuth(bool)),
    handleLoginInput: (input) => dispatch(StageLogin(input))
  }
}

const Register = (props) => {
  const handleInputChange = (e) => {
    let key = e.target.name
    let modifiedState = { ...props.loginState.formInput }
    modifiedState[key] = e.target.value
    props.handleLoginInput(modifiedState)
  }
  // const handlePasswordChange = (e) => {
  //   let modifiedState = { ...props.loginState.formInput }
  //   modifiedState.password = e.target.value
  //   props.handleLoginInput(modifiedState)
  // }
  const handleRegister = () => {
    props.registerUser(props.loginState.formInput)
    //make sure to only push if okay!!!!
    //props.history.push(`/`)
  }

  const getToken = () => {
    let token = localStorage.getItem('token')
    console.log(token)
    if (token) {
      return props.setAuth(true)
    }
  }

  return (
    <div className="login-page">
      <h3>Login</h3>
      <p>{props.loginState.authenticated}</p>
      <Input
        name="email"
        placeholder="email"
        className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
        value={props.loginState.formInput.email}
        onChange={handleInputChange}
      />
      <Input
        name="firstName"
        placeholder="First Name"
        className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
        value={props.loginState.formInput.firstName}
        onChange={handleInputChange}
      />
      <Input
        name="lastName"
        placeholder="Last Name"
        className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
        value={props.loginState.formInput.lastName}
        onChange={handleInputChange}
      />
      <Input
        name="password"
        placeholder="password"
        className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
        value={props.loginState.formInput.password}
        onChange={handleInputChange}
      />
      <Input
        name="field"
        placeholder="Field i.e. Software Engineering, Biology"
        className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
        value={props.loginState.formInput.field}
        onChange={handleInputChange}
      />
      <Input
        name="state"
        placeholder="State - abbrev"
        className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
        value={props.loginState.formInput.state}
        onChange={handleInputChange}
      />
      <Input
        name="linkedin"
        placeholder="LinkedIn url"
        className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
        value={props.loginState.formInput.linkedin}
        onChange={handleInputChange}
      />
      <Input
        name="photo"
        placeholder="Profile Pic url"
        className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
        value={props.loginState.formInput.photo}
        onChange={handleInputChange}
      />
      <Button
        label="Register"
        onClick={handleRegister}
        variant="brand"
        className="rainbow-m-around_medium"
      />
      {/* <img src={logo} />
      <div className="welcome">
        <h2>Welcome back, honey!</h2>
        <h3>Let's get dew it.</h3>
      </div>
      <form className="login-form">
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
        />
        <div className="button-box">
          <button onClick={logIn}>Log In</button>
        </div>
      </form>
      <footer>
        <br/><a href="/register">Need an account?</a>
      </footer> */}
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(Register)
