import { React, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { Input, Button } from 'react-rainbow-components'
import Login from '../components/Login'
import Register from '../components/Register'

// const mapStateToProps = ({ mentorState }) => {
//   return { mentorState }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     loadMentors: () => dispatch(LoadMentors()),
//     setUser: () => dispatch(LoadUserFromToken())
//     // setAuth: (bool) => dispatch(SetAuth(bool)),
//     // handleLoginInput: (input) => dispatch(StageLogin(input))
//   }
// }

const EntryPoint = (props) => {
  return (
    <div className="entry-point">
      <Login />
      <hr />
      <Register />
    </div>
  )
}
export default EntryPoint