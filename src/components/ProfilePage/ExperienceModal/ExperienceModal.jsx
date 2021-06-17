import { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import { addExperience, editExperience, deleteExperience } from "../../assets/fetch"

const ExperienceModal = ({ show, onHide, action, onUpdate, experienceData }) => {
  const [formData, setFormData] = useState({
    role: experienceData ? experienceData.role : "",
    company: experienceData ? experienceData.company : "",
    startDate: experienceData ? experienceData.startDate.slice(0, 7) : "",
    endDate: experienceData?.endDate ? experienceData.endDate.slice(0, 7) : "",
    description: experienceData ? experienceData.description : "",
    area: experienceData ? experienceData.area : "",
    image: experienceData ? experienceData.image : "",
  })
  const [isEndDate, setIsEndDate] = useState(true)

  const getInputData = (property, e) => {
    setFormData({ ...formData, [property]: e.currentTarget.value })
  }

  const handleSubmit = () => {
    action === "adding" ? addExperience(formData) : editExperience(experienceData._id, formData)
  }

  const handleDelete = () => {
    deleteExperience(experienceData._id)
  }

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
            onUpdate()
            onHide()
          }}
        >
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex. Web Developer"
              required
              value={formData.role}
              onChange={e => getInputData("role", e)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Company</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex. Strive School"
              required
              value={formData.company}
              onChange={e => getInputData("company", e)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" placeholder="Ex. Berlin" required value={formData.area} onChange={e => getInputData("area", e)} />
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
              <Form.Control type="month" required value={formData.startDate} onChange={e => getInputData("startDate", e)} />
            </Form.Group>
            {isEndDate && (
              <Form.Group>
                <Form.Label>End Date</Form.Label>
                <Form.Control type="month" value={formData.endDate} onChange={e => getInputData("endDate", e)} />
              </Form.Group>
            )}
          </div>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} required value={formData.description} onChange={e => getInputData("description", e)} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Image URL</Form.Label>
            <Form.Control type="text" placeholder="https://myImage.png" value={formData.image} onChange={e => getInputData("image", e)} />
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
