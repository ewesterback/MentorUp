import { React } from 'react'

import { connect } from 'react-redux'
import { LoadMentors, SelectMentor } from '../store/actions/MentorActions'

const mapStateToProps = ({ mentorState }) => {
  return { mentorState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadMentors: () => dispatch(LoadMentors()),
    setSelectedMentor: (mentor) => dispatch(SelectMentor(mentor))
  }
}

const MentorCard = (props) => {
  const onClick = (mentor) => {
    props.setSelectedMentor(mentor)
    props.history.push(`/mentors/${mentor.id}`)
  }

  return (
    <div className="mentor-card">
      <div className="top-bar"></div>
      <img className="mentor-card-image" src={props.mentor.photo} alt="" />
      <div className="content">
        <h3>
          {props.mentor.firstName} {props.mentor.lastName}
        </h3>
        {!props.mentor.currentCompany || !props.mentor.currentTitle ? (
          <p>
            {props.mentor.currentCompany}
            {props.mentor.currentTitle}
          </p>
        ) : (
          <p>
            {props.mentor.currentCompany} | {props.mentor.currentTitle}
          </p>
        )}
        <button onClick={() => onClick(props.mentor)}>Learn More</button>
      </div>
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(MentorCard)
