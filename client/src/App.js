import './App.css'
import { React, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from './components/Login'
import Register from './components/Register'
import Mentor from './pages/Mentors'
import MentorDetail from './pages/MentorDetail'
import Profile from './pages/Profile'

function App() {
  return (
    <div className="App">
      <h1>Header</h1>
      <h2>Subheader</h2>

      <p>---------------Before Routes----------------------</p>
      <Route path="/login" render={(props) => <Login {...props} />} />
      <Route exact path="/mentors" render={(props) => <Mentor {...props} />} />
      <Route path="/regsiter" render={(props) => <Register {...props} />} />
      <Route
        path="/mentors/:id"
        render={(props) => <MentorDetail {...props} />}
      />
      <Route path="/profile" render={(props) => <Profile {...props} />} />
    </div>
  )
}

export default App
