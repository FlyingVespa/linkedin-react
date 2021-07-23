import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Card, Button, Badge, Modal, Form, Row, Col, Image } from "react-bootstrap"
import { CameraFill } from "react-bootstrap-icons"
import { editProfile } from "../assets/fetch"
import UploadImage from "../assets/UploadImage"
import "./HeroSection.css"
const ENDPOINT = process.env.REACT_APP_API_URL

const HeroSection = ({ profileData, onUpdate, isMe }) => {
  const [pictureFile, setPictureFile] = useState(null)

  const [profileSection, setProfileSection] = useState({})
  // const [myExp, setMyExp] = useState({})

  useEffect(() => {
    setProfileSection({
      ...profileData,
    })
    // setMyExp({
    //   experiences,
    // })
  }, [profileData])

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [showContactMe, setShowContactMe] = useState(false)
  const handleCloseContactMe = () => setShowContactMe(false)
  const handleShowContactMe = () => setShowContactMe(true)

  const [showImgUpload, setImgUpload] = useState(false)
  const handleCloseImgUpload = () => setImgUpload(false)
  const handleShowImgUpload = () => setImgUpload(true)

  const getProfileSectionData = (property, e) => {
    setProfileSection({ ...profileSection, [property]: e.currentTarget.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("userImg", pictureFile)
    editProfile(profileSection, profileData._id, formData)

    setTimeout(() => onUpdate(), 2000)
  }

  const modalStyle = {
    // background: "black",
    overflow: "hidden",
    padding: 0,
    borderTop: "grey solid 1px",
  }

  return (
    <div className="hero-section">
      <div className="hero-cover p-relative">
        <Card.Img
          variant="top"
          src="https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fjosephliu%2Ffiles%2F2019%2F06%2F1-office-1516329_1920-1200x299.jpg"
        />
        {/* <i className="fas fa-pen-square"></i> */}

        <div className="profile-img-container" style={{ backgroundImage: `url("${profileData.image}")` }}></div>
        {isMe && <CameraFill size={26} id="upload-img-btn" onClick={handleShowImgUpload} />}
      </div>

      {isMe ? (
        <div className="d-flex px-3 spacer-on-me" style={{ flexDirection: "row-reverse" }}>
          <button className="editBtn" onClick={handleShow}>
            <i className="fas fa-pencil-alt"></i>
          </button>
        </div>
      ) : (
        <div className="spacer">{}</div>
      )}
      <div className="hero-section-columns">
        <div className="mr-5">
          <Card.Body className="pt-0 pb-2 px-3">
            <Card.Title className="profile-name">
              {profileData.name} {profileData.surname}
            </Card.Title>
            <Card.Text>
              {profileData.title}
              <br />
              <span className="area">{profileData.area} • </span>
              <Button className="p-0" variant="link" onClick={handleShowContactMe}>
                Contact info
              </Button>
              <br />
              <Button variant="link">500+ connections</Button>
            </Card.Text>
            <Card.Text>
              {isMe ? (
                <>
                  <Badge as="a" href={`${ENDPOINT}/users/${profileData._id}/cv`} pill variant="primary">
                    Download CV
                  </Badge>
                  <Badge as="a" href={`${ENDPOINT}/users/${profileData._id}/csv`} pill variant="light">
                    Download CSV
                  </Badge>
                  <Badge pill variant="light">
                    More
                  </Badge>
                </>
              ) : (
                <>
                  <Badge pill variant="primary">
                    Connect
                  </Badge>
                  <Badge pill variant="light">
                    <i className="fas fa-lock"></i> Message
                  </Badge>
                  <Badge pill variant="light">
                    More
                  </Badge>
                </>
              )}
            </Card.Text>
          </Card.Body>
        </div>

        <div>
          <div className="card-body work-history">
            {profileData.experiences.slice(-2).map(x => (
              <div key={x._id} className="mb-2">
                <img src={x.image} alt="..." /> {x.company}
              </div>
            ))}
          </div>

          {/* Contact me modal */}
          <Modal show={showContactMe} onHide={handleCloseContactMe}>
            <Modal.Header closeButton>
              <Modal.Title>
                {profileData.name} {profileData.surname}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="contact-modal">
              <h5>Contact info</h5>
              <div className="d-flex justify-content-start">
                <i className="fab fa-linkedin mr-3 p-1"></i>
                <div>
                  Your Profile
                  {isMe ? (
                    <Link to={`/user/me`}>
                      {" "}
                      linkedin.com/in/{profileData.name}-{profileData.surname}-{profileData._id}
                    </Link>
                  ) : (
                    <Link to={`/user/${profileData._id}`}>
                      {" "}
                      linkedin.com/in/{profileData.name}-{profileData.surname}-{profileData._id}
                    </Link>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-start">
                <i className="far fa-envelope mr-3 p-1"></i>
                <div>
                  Email
                  <Link to={`/user/${profileData._id}`}>{profileData.email}</Link>
                </div>
              </div>
            </Modal.Body>
          </Modal>

          {/* Edit intro modal */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title className="modal-title">Edit intro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                id="profile-form"
                onSubmit={e => {
                  handleSubmit(e)
                  handleClose()
                }}
              >
                <Form.Group className="d-inline-block col-6 pl-0">
                  <Form.Label>First name *</Form.Label>
                  <Form.Control type="text" value={profileSection.name} onChange={e => getProfileSectionData("name", e)} />
                </Form.Group>

                <Form.Group className="d-inline-block col-6 p-0">
                  <Form.Label>Last name *</Form.Label>
                  <Form.Control type="text" value={profileSection.surname} onChange={e => getProfileSectionData("surname", e)} />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Headline *</Form.Label>
                  <Form.Control as="textarea" rows={2} value={profileSection.title} onChange={e => getProfileSectionData("title", e)} />
                </Form.Group>

                {/* Experience and Education might go here */}

                <Form.Group>
                  <Form.Row>
                    <Form.Label>Country / Region *</Form.Label>
                    <Form.Control type="text" value={profileSection.area} onChange={e => getProfileSectionData("area", e)} />
                  </Form.Row>
                </Form.Group>

                {profileSection?.image && <img src={profileSection.image} alt="post" className="img-fluid" />}

                <Form.Group>
                  <UploadImage image={profileSection.image} />

                  <Form.Control id="file-input" type="file" onChange={e => setPictureFile(e.target.files[0])} className="d-none" />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Contact info</Form.Label>
                  <Form.Control
                    id="contact-info"
                    type="text"
                    value={profileSection.email}
                    onChange={e => getProfileSectionData("email", e)}
                  />
                  {/* This should be border-bottom only, with a pencil icon */}
                </Form.Group>
              </Form>
              <Button variant="primary" type="submit" id="hero-submit" form="profile-form">
                Save
              </Button>
            </Modal.Body>
          </Modal>

          <Modal size="lg" show={showImgUpload} onHide={handleCloseImgUpload}>
            <Form
              onSubmit={e => {
                handleSubmit(e)
                handleCloseImgUpload()
              }}
            >
              <Modal.Body style={modalStyle} className="bg-dark">
                <Row className="p-5 text-center">
                  <Col>
                    <Image id="jumboProfile_img_update" src={profileData.image} />
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer className="bg-dark text-white" style={modalStyle}>
                <Row className="text-center flex-fill align-items-center">
                  <Col xs={8} className="mt-2">
                    <Form.Group>
                      <Form.Control id="file-input" type="file" onChange={e => setPictureFile(e.target.files[0])} />
                    </Form.Group>
                  </Col>
                  <Col xs={4}>
                    <Button type="submit" variant="light">
                      <CameraFill size={26} /> Upload
                    </Button>
                  </Col>
                </Row>
              </Modal.Footer>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
