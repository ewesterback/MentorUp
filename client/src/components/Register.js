import { React, useEffect, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  RegisterUser,
  SetAuth,
  StageLogin,
  CheckEmail
} from '../store/actions/LoginActions'
import { FindEmail } from '../services/UserService'
import {
  Input,
  Button,
  CheckboxToggle,
  Textarea,
  RadioButtonGroup
} from 'react-rainbow-components'

const mapStateToProps = ({ loginState }) => {
  return { loginState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (input) => dispatch(RegisterUser(input)),
    setAuth: (bool) => dispatch(SetAuth(bool)),
    handleLoginInput: (input) => dispatch(StageLogin(input)),
    verifyEmail: (email) => dispatch(CheckEmail(email))
  }
}

const Register = (props) => {
  const [emailVerified, setEmailVerified] = useState(false)
  const [registrationError, setRegistraionError] = useState('')

  const onNext = async () => {
    //const email = { email:  }
    //props.verifyEmail(props.loginState.formInput.email)
    console.log(props.loginState.formInput.email)
    let val = await FindEmail(props.loginState.formInput.email)
    //val.data
    console.log(val.data)
    if (val.data.length > 0) {
      setRegistraionError('Email already in use')
    } else {
      setEmailVerified(true)
      setRegistraionError('')
    }
  }
  const handleInputChange = (e) => {
    let key = e.target.name
    let modifiedState = { ...props.loginState.formInput }
    modifiedState[key] = e.target.value
    props.handleLoginInput(modifiedState)
  }
  const handleRegister = (e) => {
    e.preventDefault()
    let regBody = props.loginState.formInput
    if (!regBody.photo) {
      regBody.photo = 'https://imgur.com/IPrg772.jpg'
    }

    props.registerUser(regBody)
    props.history.push(`/`)
  }

  const getToken = () => {
    let token = localStorage.getItem('token')
    if (token) {
      return props.setAuth(true)
    }
  }

  const handleAvailToMentorChange = () => {
    let modifiedState = { ...props.loginState.formInput }
    modifiedState.availableToMentor =
      !props.loginState.formInput.availableToMentor
    props.handleLoginInput(modifiedState)
  }
  const options = [
    { value: '0-1', label: '0to1' },
    { value: '1-3', label: '1to3' },
    { value: '3-5', label: '3to5' },
    { value: '10+', label: '10+' }
  ]
  return (
    <div className="register-page">
      <Button label="Back to Login" onClick={() => props.history.push('/')} />
      {emailVerified ? (
        <Input
          name="email"
          label="Email"
          placeholder="janedoe@gmail.com"
          disabled
          className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto register-input"
          value={props.loginState.formInput.email}
          onChange={handleInputChange}
        />
      ) : (
        <Input
          name="email"
          placeholder="janedoe@gmail.com"
          label="Email"
          className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto register-input"
          value={props.loginState.formInput.email}
          onChange={handleInputChange}
        />
      )}

      {registrationError ? <p>{registrationError}</p> : null}
      {emailVerified ? null : <Button label="Next" onClick={onNext} />}
      {!emailVerified ? null : (
        <div>
          <Input
            name="firstName"
            label="First Name"
            placeholder="Jane"
            required
            className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto register-input"
            value={props.loginState.formInput.firstName}
            onChange={handleInputChange}
          />
          <Input
            name="lastName"
            placeholder="Doe"
            label="Last Name"
            required
            className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto register-input"
            value={props.loginState.formInput.lastName}
            onChange={handleInputChange}
          />
          <Input
            name="password"
            label="password"
            placeholder="password"
            type="password"
            required
            className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto register-input"
            value={props.loginState.formInput.password}
            onChange={handleInputChange}
          />
          <CheckboxToggle
            value={props.loginState.formInput.availableToMentor}
            onChange={handleAvailToMentorChange}
            label="Do you want to be a mentor?"
          />
          <Input
            name="state"
            label="State-postal abbreviation"
            placeholder="CA"
            required
            className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto register-input"
            value={props.loginState.formInput.state}
            onChange={handleInputChange}
          />
          <Input
            name="linkedin"
            label="LinkedIn url"
            required
            placeholder="https://www.linkedin.com/in/jane-doe/"
            className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto register-input"
            value={props.loginState.formInput.linkedin}
            onChange={handleInputChange}
          />
          <Input
            name="photo"
            label="Profile Picture url"
            placeholder="https://imgur.com/IPrg772.jpg"
            className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto register-input"
            value={props.loginState.formInput.photo}
            onChange={handleInputChange}
          />

          <Input
            name="currentTitle"
            label="Current Title"
            placeholder="Junior Developer, Student, Actively Looking"
            className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto register-input"
            value={props.loginState.formInput.currentTitle}
            onChange={handleInputChange}
          />
          <Input
            name="currentCompany"
            label="Current Company"
            placeholder="Twitter"
            className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto register-input"
            value={props.loginState.formInput.currentCompany}
            onChange={handleInputChange}
          />
          <RadioButtonGroup
            size="medium"
            name="yearsInIndustry"
            label="Years in Industry"
            options={options}
            value={props.loginState.formInput.yearsInIndustry}
            onChange={handleInputChange}
          />
          <Textarea
            name="bio"
            label="Bio"
            placeholder="Brief description about yourself and areas that you are knowledgable in"
            value={props.loginState.formInput.bio}
            onChange={handleInputChange}
            className="register-input"
          />
          <Input
            name="passions"
            placeholder="i.e. React Redux, Knitting, and Rock Climbing"
            label="Passions - in and out of work"
            className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto register-input"
            value={props.loginState.formInput.passions}
            onChange={handleInputChange}
          />
          <button onClick={handleRegister} className="register-input">
            Register
          </button>
        </div>
      )}
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(Register)
