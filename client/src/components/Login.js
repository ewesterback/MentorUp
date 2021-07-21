import { React } from 'react'
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
  }

  return (
    <div className="login-page">
      <Input
        placeholder="email"
        className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto login-input"
        value={props.loginState.formInput.email}
        onChange={handleEmailChange}
      />
      <Input
        placeholder="password"
        type="password"
        className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto login-input"
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
        className="rainbow-m-around_medium login-input"
      />
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
