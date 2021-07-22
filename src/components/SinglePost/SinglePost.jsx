import React from "react"
import { Alert } from "react-bootstrap"
import "./singlepost.css"
import { useState } from "react"
import EditPostModal from "./EditPostModal"
import "bootstrap-icons/font/bootstrap-icons.css"
import { Accordion, InputGroup, Col, Row, Button, Image, FormControl } from "react-bootstrap"

// import {
//   postLikes,
//   postComments,
//   putComments,
//   getComments,
//   delComments,
// } from "../assets/fetch";

const SinglePost = ({ postInfo, onUpdate, userData, currentUser }) => {
  const [readMore, setReadMore] = useState(false)
  const [wasDeleted, setWasDeleted] = useState(false)
  // const [like, setLike] = useState(false)
  // const [comment, setComment] = useState(false)

  // Modal stuff
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const currentDate = new Date()
  const timestamp = currentDate.getMinutes()
  const handleDelete = () => setWasDeleted(true)

  if (wasDeleted)
    return (
      <Alert variant="info" className="my-3">
        Deleting... Stay with me...
      </Alert>
    )

  return (
    <>
      <Accordion>
        <div className="section-card p-3">
          <div className="d-flex mb-2 single-post">
            <img src={userData.image} alt="" className="user-picture" />
            <div className="ml-3">
              <p>
                {userData.name} {userData.surname}
              </p>
              <span className="text">
                <p>12k followers</p>
                <div className="d-flex justify-content-start">
                  <p className="pr-1">{`${timestamp}m`}</p>
                  <p className="pr-1">Edited </p>
                  <p>
                    <i className="fas fa-circle pr-1"></i>
                  </p>
                  <p>
                    <i className="fas fa-globe-europe"></i>
                  </p>
                </div>
              </span>
            </div>
            {userData?._id === currentUser._id && <i className="fas fa-ellipsis-h ml-auto" onClick={handleShow}></i>}
          </div>
          <div className="post">
            <div>
              {!readMore && postInfo.text.length > 200 ? `${postInfo.text.substring(0, 200)}...` : postInfo.text}
              {postInfo.text.length > 200 && (
                <div className="read-more-div">
                  <button className="read-more" onClick={() => setReadMore(!readMore)}>
                    {readMore ? "show less" : "  read more"}
                  </button>
                </div>
              )}
            </div>
            {postInfo.image && <img className="w-100" src={postInfo.image} alt="post" />}
            <hr />
            <div className="mt-3 d-flex justify-content-between">
              <div className="reactions">
                <Button className="far fa-thumbs-up">{/* onClick={()=> setLikes(!Likes)*/} Like</Button>
              </div>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                <div className="reactions">
                  <i className="far fa-comments "> Comment</i>
                </div>
              </Accordion.Toggle>
              <div className="reactions">
                <i className="fas fa-share "> Share</i>
              </div>
              <div className="reactions">
                <i className="fas fa-paper-plane "> Send</i>
              </div>
            </div>

            <Accordion.Collapse eventKey="1">
              <Row className="mt-3">
                <Col xs={2}>
                  <Image className="getPost-comment-img" src={currentUser.image} />
                </Col>
                <Col xs={10} className="align-text-bottom">
                  <InputGroup className="mb-3">
                    <FormControl className="getPost-commentInput" aria-label="Text input with checkbox" placeholder="Add a comment..." />
                    {/* <div className="addpostfooterbtn-section d-flex justify-content-between ">
                      <Button className="addpostfooterbtn mx-1">
                        <Row>
                          <Col>
                            
                            <i className="bi bi-card-image"></i>
                          </Col>
                        </Row>
                      </Button>
                    </div> */}
                    {/* <MediaModal id={props.id} /> */}

                    <Button
                      className="getPost-commentSend-btn mx-1"
                      type="submit"
                      // onclick= {()=> setComment}
                    >
                      <i className="bi bi-reply"></i>
                    </Button>
                  </InputGroup>
                </Col>
              </Row>
            </Accordion.Collapse>
          </div>
        </div>
        <EditPostModal show={show} onHide={handleClose} postInfo={postInfo} onUpdate={onUpdate} onDelete={handleDelete} />
      </Accordion>
    </>
  )
}

export default SinglePost
