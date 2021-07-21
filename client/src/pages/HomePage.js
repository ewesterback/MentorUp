import { React } from 'react'
import { connect } from 'react-redux'
import { SetAuth } from '../store/actions/LoginActions'
import EntryPoint from './EntryPoint'
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
