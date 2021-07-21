import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { editPost, deletePost } from "../assets/fetch";
import UploadImage from "../assets/UploadImage";

const EditPostModal = ({
  show,
  onHide,
  postInfo,
  onUpdate,
  onDelete,
  location,
  history,
}) => {
  const [postDetails, setPostDetails] = useState(null);
  const [pictureFile, setPictureFile] = useState(null);

  useEffect(
    () => setPostDetails({ text: postInfo.text, image: postInfo.image }),
    [postInfo]
  );

  const submitForm = (type) => {
    let formData = null;
    if (pictureFile) {
      formData = new FormData();
      formData.append("postImg", pictureFile);
    }
    type === "edit"
      ? editPost(postInfo._id, postDetails, formData)
      : deletePost(postInfo._id);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Test</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={postDetails?.text}
              onChange={(e) =>
                setPostDetails({ ...postDetails, text: e.currentTarget.value })
              }
            />
          </Form.Group>
          {postDetails?.image && (
            <img src={postDetails.image} alt="post" className="img-fluid" />
          )}
          <Form.Group>
            <UploadImage image={postDetails?.image} />
            {/* replaces Form.Label */}
            <Form.Control
              id="file-input"
              type="file"
              onChange={(e) => setPictureFile(e.target.files[0])}
              className="d-none"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => {
            submitForm("delete");
            onDelete();
            onHide();
            setTimeout(() => {
              if (location.pathname.includes("post")) {
                history.goBack();
              } else {
                onUpdate();
              }
            }, 2000);
          }}
        >
          Delete
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            submitForm("edit");
            setTimeout(() => onUpdate(), 2000);
            onHide();
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default withRouter(EditPostModal);
