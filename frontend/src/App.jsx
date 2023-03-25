import { Container } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ChatMain from "./components/chats/ChatMain";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Request from "./components/Request";
import { io } from "socket.io-client";

export const UserContext = createContext();
export const socket = io("http://localhost:8080");

socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

const App = () => {
  const user = useState(null);
  return (
    <UserContext.Provider value={user}>
      <Routes>
        <Route path="*" element={<DefaultApp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </UserContext.Provider>
  );
};

const DefaultApp = () => {
  const [User, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    // console.log("User", User);
    !User && navigate("/login");
  }, []);
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 12 }} maxWidth={"lg"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/requests" element={<Request />} />
          <Route path="/chats" element={<ChatMain />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
