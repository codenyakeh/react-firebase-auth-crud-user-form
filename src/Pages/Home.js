import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Users from "../component/Users";
import AddUserForm from "../component/AddUserForm";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import styled from "styled-components";

const Button = styled.button`
background-color: pink;
border: none;
border-radius: 5px;
color: white;
height: 30px;
`;

function Home() {
  const logout = () => {
    try {
      signOut(auth);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container style={{ marginTop: "30px", width: "100%"}}>
      <Row>
        <Col md={6}>
          <AddUserForm />
        </Col>
        <Col md={6}>
          <Users />
        </Col>
      </Row>
      <Button onClick={logout} >LogOut</Button>
    </Container>
  );
}

export default Home;
