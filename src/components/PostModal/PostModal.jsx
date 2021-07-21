import { Modal, Button, Form } from "react-bootstrap";
import { getProfileById, addPost } from "../assets/fetch";

import { useEffect, useState } from "react";
import "./PostModal.css";
import UploadImage from "../assets/UploadImage";

const PostModal = ({ show, onHide, onUpdate }) => {
  const [myProfile, setMyProfile] = useState({});
  const [pictureFile, setPictureFile] = useState(null);

  const [data, setData] = useState({
    text: "",
    image: "",
  });

  useEffect(() => {
    getProfileById("60c73bf1291930001560aba3", setMyProfile);
  }, []);

  const getData = (e) => {
    setData({ text: e.currentTarget.value });
  };

  const handlePost = () => {
    let formData = null;
    if (pictureFile) {
      formData = new FormData();
      formData.append("post", pictureFile);
    }
    addPost(data, formData);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create a post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex profile-image-container">
          <img src={myProfile.image} alt="profile" className="w-100"></img>
        </div>
        <Form
          id="post-form"
          className="w-100"
          onSubmit={(e) => {
            e.preventDefault();
            handlePost();
            setData({ text: "" });
            setTimeout(() => {
              onUpdate();
            }, 2000);
            onHide();
          }}
        >
          <Form.Group
            className="mb-3 post-text"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="What do you want to talk about"
              value={data.text}
              onChange={(e) => getData(e)}
              required
            />
          </Form.Group>
          <Form.Group>
            <UploadImage />
            <Form.Control
              className="d-none"
              id="file-input"
              type="file"
              onChange={(e) => setPictureFile(e.target.files[0])}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit" form="post-form">
          Post
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default PostModal;
