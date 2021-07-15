import { React, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { LoadUser, SetAuth, StageLogin } from '../store/actions/LoginActions'
import { Input, Button } from 'react-rainbow-components'

const mapStateToProps = ({ loginState }) => {
  return { loginState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (email, password) => dispatch(LoadUser(email, password)),
    setAuth: (bool) => dispatch(SetAuth(bool)),
    handleLoginInput: (input) => dispatch(StageLogin(input))
  }
}

const Login = (props) => {
  const handleEmailChange = (e) => {
    let modifiedState = { ...props.loginState.formInput }
    modifiedState.email = e.target.value
    props.handleLoginInput(modifiedState)
  }
  const handlePasswordChange = (e) => {
    let modifiedState = { ...props.loginState.formInput }
    modifiedState.password = e.target.value
    props.handleLoginInput(modifiedState)
  }
  const handleLogin = () => {
    props.loginUser(
      props.loginState.formInput.email,
      props.loginState.formInput.password
    )

    console.log('made it to catch in login')

    //make sure to only push if okay!!!!
    //props.history.push(`/`)
    //---------------------------
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
        placeholder="email"
        className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
        value={props.loginState.formInput.email}
        onChange={handleEmailChange}
      />
      <Input
        placeholder="password"
        className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
        value={props.loginState.formInput.password}
        onChange={handlePasswordChange}
      />
      {props.loginState.loginError ? (
        <p>{props.loginState.loginError}</p>
      ) : null}
      <Button
        label="Login"
        onClick={handleLogin}
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
export default connect(mapStateToProps, mapDispatchToProps)(Login)
