import { useState, useEffect } from "react"
import { Button, Modal, Form } from "react-bootstrap"
import { editProfile } from "../assets/fetch"
import "./AboutSection.css"

const AboutSection = ({ profileData, onUpdate, isMe }) => {
  const [aboutSection, setAboutSection] = useState({})

  useEffect(() => {
    setAboutSection({
      ...profileData,
    })
  }, [profileData])

  const [showAbout, setShowAbout] = useState(false)
  const handleCloseAbout = () => setShowAbout(false)
  const handleShowAbout = () => setShowAbout(true)

  // const [seeMore, setSeeMore] = useState(false)

  return (
    <section className="about-section">
      <div className="d-flex justify-content-between">
        <h5>About</h5>
        {isMe && (
          <button className="editBtn" onClick={handleShowAbout}>
            <i className="fas fa-pencil-alt"></i>
          </button>
        )}
      </div>
      <div>
        <p>{profileData.bio}</p>
        {/* LinkedIn allows approx. 738 characters, can we truncate? */}

        {/* <p>
          {seeMore ? profileData.bio : `${profileData.bio.substring(0, 200)}...`}
          <button variant="link" className="btn-link" onClick={() => setSeeMore(!seeMore)}>
            {seeMore ? "see less" : "  see more"}
          </button>
        </p> */}
      </div>

      <Modal show={showAbout} onHide={handleCloseAbout}>
        <Modal.Header closeButton>
          <Modal.Title>Edit about</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            id="about-form"
            onSubmit={e => {
              e.preventDefault()
              editProfile(aboutSection, profileData._id)
              onUpdate()
              handleCloseAbout()
            }}
          >
            <Form.Group className="d-inline-block w-100">
              <Form.Label>Summary</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={aboutSection.bio}
                onChange={e => setAboutSection({ bio: e.currentTarget.value })}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="primary" type="submit" form="about-form" className="save-btn">
                Save
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </section>
  )
}

export default AboutSection
