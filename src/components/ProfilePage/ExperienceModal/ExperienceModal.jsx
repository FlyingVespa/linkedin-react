import { useEffect } from "react"
import { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import { addEditExperience, deleteExperience } from "../../assets/fetch"
import UploadImage from "../../assets/UploadImage"

const ExperienceModal = ({ show, onHide, action, onUpdate, experienceData, currentUser }) => {
  const [formInput, setFormInput] = useState({})
  const [isEndDate, setIsEndDate] = useState(true)
  const [pictureFile, setPictureFile] = useState(null)

  const getInputData = (property, e) => {
    setFormInput({ ...formInput, [property]: e.currentTarget.value })
  }

  const handleSubmit = () => {
    let formData = null
    if (pictureFile) {
      formData = new FormData()
      formData.append("experience", pictureFile)
    }
    addEditExperience(experienceData ? experienceData._id : "", formInput, currentUser._id, formData)
    setFormInput({
      role: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
      area: "",
      image: "",
    })
  }

  const handleDelete = () => {
    deleteExperience(experienceData._id)
  }

  useEffect(() => {
    setFormInput({
      role: experienceData ? experienceData.role : "",
      company: experienceData ? experienceData.company : "",
      startDate: experienceData ? experienceData.startDate.slice(0, 7) : "",
      endDate: experienceData?.endDate ? experienceData.endDate.slice(0, 7) : "",
      description: experienceData ? experienceData.description : "",
      area: experienceData ? experienceData.area : "",
    })
  }, [experienceData])

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{action === "adding" ? "Add experience" : "Edit experience"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          id="experience-form"
          onSubmit={e => {
            e.preventDefault()
            handleSubmit()
            setTimeout(() => onUpdate(), 2000)
            onHide()
          }}
        >
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex. Web Developer"
              required
              value={formInput.role}
              onChange={e => getInputData("role", e)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Company</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex. Strive School"
              required
              value={formInput.company}
              onChange={e => getInputData("company", e)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" placeholder="Ex. Berlin" required value={formInput.area} onChange={e => getInputData("area", e)} />
          </Form.Group>

          <Form.Group>
            <Form.Check
              type="checkbox"
              label="I am currently working in this role"
              onChange={e => {
                e.currentTarget.checked ? setIsEndDate(false) : setIsEndDate(true)
              }}
            />
          </Form.Group>

          <div className="d-flex">
            <Form.Group>
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="month" required value={formInput.startDate} onChange={e => getInputData("startDate", e)} />
            </Form.Group>
            {isEndDate && (
              <Form.Group>
                <Form.Label>End Date</Form.Label>
                <Form.Control type="month" value={formInput.endDate} onChange={e => getInputData("endDate", e)} />
              </Form.Group>
            )}
          </div>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} required value={formInput.description} onChange={e => getInputData("description", e)} />
          </Form.Group>

          {formInput?.image && <img src={formInput.image} alt="post" className="img-fluid" />}

          <Form.Group>
            <UploadImage image={formInput.image} />
            {/* replaces Form.Label */}
            <Form.Control id="file-input" type="file" onChange={e => setPictureFile(e.target.files[0])} className="d-none" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {action === "editing" && (
          <Button
            variant="danger"
            onClick={() => {
              handleDelete()
              onUpdate()
              onHide()
            }}
          >
            Delete
          </Button>
        )}
        <Button variant="primary" type="submit" form="experience-form">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ExperienceModal
