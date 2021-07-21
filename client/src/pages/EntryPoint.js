import { React } from 'react'
import { Button } from 'react-rainbow-components'
import Login from '../components/Login'

const EntryPoint = (props) => {
  return (
    <div className="entry-point">
      <div className="entry-left">
        <h2>Feel like an imposter?</h2>

        <h1>MentorUp!</h1>
        <Login />
        <hr />
        <div>
          <h3>Need an account? Register below!</h3>
          <Button
            label="Register for an account"
            onClick={() => props.history.push('/register')}
          />
        </div>
        <p>
          Imposter syndrome is common amongst software engineers, and is
          especially prevelant among minorities. It can be extremely difficult
          to see what success looks like for <b>you</b> when there is a
          significant lack of peers that look like you and have experienced
          similar challenges as you.
        </p>
        <p>Use MentorUp to create your network of relateble mentors</p>
      </div>
    </div>
  )
}
export default EntryPoint
