import './App.css'
import { React, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { SetAuth } from './store/actions/LoginActions'
import Login from './components/Login'
import Register from './components/Register'
import Mentor from './pages/Mentors'
import MentorDetail from './pages/MentorDetail'
import Messages from './pages/Messages'
import Nav from './components/Nav'
import HomePage from './pages/HomePage'

const mapStateToProps = ({ loginState }) => {
  return { loginState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAuth: (bool) => dispatch(SetAuth(bool))
  }
}

function App(props) {
  const getToken = () => {
    let token = localStorage.getItem('token')
    if (token) {
      return props.setAuth(true)
    }
  }
  //set authenication again if user refreshed page
  useEffect(() => {
    getToken()
  }, [])
  return (
    <div className="App">
      <Nav {...props} />
      <Route exact path="/" render={(props) => <HomePage {...props} />} />
      <Route path="/login" render={(props) => <Login {...props} />} />
      <Route exact path="/mentors" render={(props) => <Mentor {...props} />} />
      <Route path="/register" render={(props) => <Register {...props} />} />
      <Route
        path="/mentors/:id"
        render={(props) => <MentorDetail {...props} />}
      />
      <Route path="/messages" render={(props) => <Messages {...props} />} />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
