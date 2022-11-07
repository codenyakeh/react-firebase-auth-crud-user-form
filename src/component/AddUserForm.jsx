import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { v4 as uuid } from "uuid";

const AddUserForm = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gen, setGen] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newUser = {
      name,
      email,
      gen,
      id: uuid(),
      timestamp: serverTimestamp(),
    };

    try {
      const docRef = await setDoc(doc(db, "Users", newUser.id), newUser);
    } catch (e) {
      console.log(e);
    }

    const myUsers = { name, email, gen, id: uuid() };
    await setDoc(doc(db, "Contacts", myUsers.id), myUsers);

    setName("");
    setEmail("");
    setGen("");
  };

  return (
    <div style={{ width: "100%" }}>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
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
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicGen">
          <Form.Label>Gen</Form.Label>
          <Form.Control
            type="number"
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
          style={{
            backgroundColor: "pink",
            border: "none",
            marginBottom: "50px",
          }}
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddUserForm;
