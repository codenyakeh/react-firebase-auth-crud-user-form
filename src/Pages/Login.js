import { Button, Form, Card } from "react-bootstrap";
import React, { useState } from "react";
import styled from "styled-components";
import GoogleIcon from "@mui/icons-material/Google"
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  margin: 50px;
  width: 35%;
`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const handle = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      navigate("/home", { replace: true });
    } catch (e) {
      console.log(e);
    }
    setEmail("");
    setPassword("");
  };

  //Google
  const google = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithPopup(auth, provider);
      console.log(user);
      navigate("/home", { replace: true });
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
          <h2 className="text-center mb-4">Log In</h2>
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
            <Button
              onClick={handle}
              style={{ margin: "10px", backgroundColor: "pink" }}
            >
              Log In
            </Button>
            <Button onClick={google} style={{ backgroundColor: "pink" }}>
              <GoogleIcon />sign in with google
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
export default Login;
