import { useState } from "react";
import { Card, Form } from "react-bootstrap";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";


//import { link, useHistory } from "react-router-dom";

const Container = styled.div`
margin: 50px;
width: 40%;
`;
const BottomText = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 2px;
`;
const TopText = styled.h1`
  text-align: center;
  margin-bottom: 4px;
`;
const Button = styled.button`
  width: 100%;
  margin-top: 10px;
  background: pink;
  border: none;
  color: white;
  border-radius: 5px;
  height: 40px;
`;

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handle = async (e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
      navigate("/login", { replace: true });
    } catch (e) {
      console.log(e);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <TopText>Sign Up</TopText>
          <Form onSubmit={handle}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Button onClick={handle}>Sign Up</Button>
          </Form>
        </Card.Body>
      </Card>
      <BottomText>
        Already have an account? <Link to="/login">Log In</Link>
      </BottomText>
    </Container>
  );
}
