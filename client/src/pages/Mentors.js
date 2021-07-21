import { React, useEffect } from 'react'
import { connect } from 'react-redux'
import { LoadMentors, LoadUserFromToken } from '../store/actions/MentorActions'
import MentorCard from '../components/MentorCard'

const mapStateToProps = ({ mentorState }) => {
  return { mentorState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadMentors: () => dispatch(LoadMentors()),
    setUser: () => dispatch(LoadUserFromToken())
  }
}

const Mentors = (props) => {
  useEffect(() => {
    props.setUser()
    props.loadMentors()
  }, [])
  const mappedMentors = props.mentorState.mentors.map((mentor, i) => (
    <MentorCard mentor={mentor} key={i} {...props} />
  ))
  return <div className="mentor-page">{mappedMentors}</div>
}
export default connect(mapStateToProps, mapDispatchToProps)(Mentors)
