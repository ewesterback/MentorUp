import { React, useEffect, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  RegisterUser,
  SetAuth,
  StageLogin,
  CheckEmail
} from '../store/actions/LoginActions'
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

  const onNext = () => {
    const email = { email: props.loginState.formInput.email }
    props.verifyEmail(email)
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
    //make sure to only push if okay!!!!
    //props.history.push(`/`)
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
      <Input
        name="email"
        placeholder="email"
        className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
        value={props.loginState.formInput.email}
        onChange={handleInputChange}
      />
      <Button label="Next" onClick={onNext} />
      {emailVerified ? null : (
        <div>
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
            label="password"
            placeholder="password"
            type="password"
            className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
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

          <Input
            name="currentTitle"
            placeholder="Current Title i.e. Junior Developer, Student, Actively Looking"
            className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
            value={props.loginState.formInput.currentTitle}
            onChange={handleInputChange}
          />
          <Input
            name="currentCompany"
            placeholder="Current Company"
            //className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
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
            placeholder="Please enter a brief bio describing a little bit about yourself and areas that you are knowledgable in"
            value={props.loginState.formInput.bio}
            onChange={handleInputChange}
          />
          <Input
            name="passions"
            placeholder="i.e. React Redux, Knitting, and Travelling"
            label="Enter a few or your passions, both in your job and outside of 9-5"
            //className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
            value={props.loginState.formInput.passions}
            onChange={handleInputChange}
          />
          <Button
            label="Register"
            onClick={handleRegister}
            variant="brand"
            className="rainbow-m-around_medium"
          />
        </div>
      )}
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(Register)
