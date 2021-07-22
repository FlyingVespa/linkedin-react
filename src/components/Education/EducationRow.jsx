import React from "react"
import { useState } from "react"
import SingleEducation from "./SingleEducation"
import EducationModal from "../ProfilePage/EducationModal/EducationModal"
import "./education.css"

const details = {
  institute: "Strive School",
  course: "Full Stack Web Development",
  location: "Berlin, Germany",
  years: "2008-2009",
}
const EducationRow = ({ isMe }) => {
  const [show, setShow] = useState(false)
  const image =
    "https://media-exp3.licdn.com/dms/image/C4D0BAQFFQIjyDsOK0w/company-logo_200_200/0/1593351903670?e=1632355200&v=beta&t=01RObunrVhJxBy0F7ekd6oGjw551Tn4tOQCol9x7WzA"

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <div className="education-page px-1">
      <div className="d-flex justify-content-between">
        <h5 className="education-title">Education</h5>
        {isMe && (
          <button className="text-muted p-0" onClick={handleShow}>
            <i className="fas fa-plus"></i>
          </button>
        )}
      </div>
      <SingleEducation
        isMe={isMe}
        image={image}
        institute={details.institute}
        course={details.course}
        location={details.location}
        years={details.years}
      />
      <EducationModal
        show={show}
        onHide={handleClose}
        image="https://media-exp3.licdn.com/dms/image/C4D0BAQFFQIjyDsOK0w/company-logo_200_200/0/1593351903670?e=1632355200&v=beta&t=01RObunrVhJxBy0F7ekd6oGjw551Tn4tOQCol9x7WzA"
      />
    </div>
  )
}
export default EducationRow
