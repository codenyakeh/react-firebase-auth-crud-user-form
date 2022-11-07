import React, { useState } from "react";
import { Col, Button } from "react-bootstrap";
import { Card, Modal } from "react-bootstrap";
import EditUserForm from "./EditUserForm";
import { connect, useDispatch } from "react-redux";
import { deleteUser } from "../action/usersAction";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const User = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteDoc(doc(db, "Users", props.userBio.id));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Users Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditUserForm
            editUser={props.editUser}
            userBio={props.userBio}
            hide={handleClose}
          />
        </Modal.Body>
      </Modal>
      <Col md={6} style={{ marginBottom: "10px" }}>
        <Card>
          <Card.Body>
            <Card.Title>Name:{props.userBio.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Email:{props.userBio.email}
            </Card.Subtitle>
            <Card.Text>Gen:{props.userBio.gen}</Card.Text>
            <Button
              href="#"
              size="sm"
              style={{ backgroundColor: "pink", border: "none" }}
              onClick={handleShow}
            >
              Update
            </Button>
            <Button
              href="#"
              size="sm"
              style={{
                backgroundColor: "pink",
                border: "none",
                marginLeft: "5px",
              }}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

const mapDispatchToProps = {
  deleteUser,
};

export default connect(null, mapDispatchToProps)(User);
