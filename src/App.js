import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "./firebase/config";
import { addUser } from "./action/usersAction";
import { useDispatch } from "react-redux";
import { auth } from "./firebase/config";
import { dispatchUser } from "./action/authAction";
import Routers from "./Routers";

const Container = styled.div`
  align-items: center;
  justify-content: center;
`;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const readData = async () => {
      const q = query(collection(db, "Users"), orderBy("timestamp", "asc"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const userArr = [];
        querySnapshot.forEach((doc) => {
          userArr.push(doc.data());
        });
        dispatch(addUser(userArr));
        console.log(userArr);
      });
    };
    readData();
  }, []);

  // dispatch action to the authReducer
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(dispatchUser(user));
      } else {
        dispatch(dispatchUser(null));
      }
      console.log(user);
    });
  }, []);

  return (
    <Container style={{ marginTop: "30px" }}>
      <Routers />
    </Container>
  );
}

export default App;
