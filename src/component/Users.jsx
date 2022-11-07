import React from "react";
import User from "./User";
import { Container, Row } from "react-bootstrap";
import {useSelector} from "react-redux";

const Users = (props) => {
  const users = useSelector((state) => {
    return state.userReducer.users;
  });
  return (
    <div>
      <Container>
        <Row>
          {users.map((item) => {
            return (
              <User
                key={item.id}
                userBio={item}
                delete={props.delete}
                editUser={props.editUser}
              />
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Users;
