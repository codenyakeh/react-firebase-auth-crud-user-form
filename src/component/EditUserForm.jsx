import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { editUsers } from "../action/usersAction";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { useDispatch } from "react-redux";

const EditUserForm = (props) => {
  const [name, setName] = useState(props.userBio.name);
  const [email, setEmail] = useState(props.userBio.name);
  const [gen, setGen] = useState(props.userBio.gen);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUsers = {
      id: props.userBio.id,
      name,
      email,
      gen,
      timestamp: serverTimestamp,
    };
    try {
      const userRef = doc(db, "Users", newUsers.id);
      await updateDoc(userRef, newUsers);
    } catch (e) {
      console.log(e);
    }
    dispatch(editUsers(newUsers));
    setName("");
    setEmail("");
    setGen("");
    props.hide();
  };
  return (
    <Form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Gen</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Gen"
          name="gen"
          value={gen}
          onChange={(e) => {
            setGen(e.target.value);
          }}
        />
      </Form.Group>
      <Button
        onClick={handleSubmit}
        style={{ backgroundColor: "pink", border: "none" }}
        type="submit"
      >
        Submit
      </Button>
    </Form>
  );
};

const mapDispatchToProps = {
  editUsers,
};

export default connect(null, mapDispatchToProps)(EditUserForm);
