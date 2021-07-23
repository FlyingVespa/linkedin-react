import { useState } from "react"
import ExperienceModal from "../ProfilePage/ExperienceModal/ExperienceModal"

const SingleExperience = ({ experienceData, onUpdate, isMe, currentUser }) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div className="single-experience d-flex align-items-start my-2">
      <img src={experienceData.image || "https://via.placeholder.com/150"} alt="" width="56px" />
      <div className="d-flex flex-column ml-3 mr-1 w-100">
        <div className="d-flex justify-content-between">
          <h6>{experienceData.role}</h6>
          {isMe && (
            <button className="editBtn mr-2" onClick={handleShow}>
              <i className="fas fa-pencil-alt experience-pencil-icon"></i>
            </button>
          )}
        </div>
        <p>{experienceData.company}</p>
        <p className="font-grey">{`${new Date(experienceData.startDate).toLocaleDateString()} - ${
          experienceData.endDate ? new Date(experienceData.endDate).toLocaleDateString() : ""
        }`}</p>
        <p className="font-grey">{experienceData.area}</p>
        <p>{experienceData.description}</p>
        <hr className="my-3" />
      </div>
      <ExperienceModal
        show={show}
        onHide={handleClose}
        action="editing"
        currentUser={currentUser}
        onUpdate={onUpdate}
        experienceData={experienceData}
      />
    </div>
  )
}

export default SingleExperience
