import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { Url } from "../utils";

const Login = () => {
  const navigate = useNavigate();
  const [User, setUser] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
    axios.post(`${Url}/login`, { email, password }).then((res) => {
      setUser(res.data.response);
      document.querySelector("title").innerText = res.data.response.name;
      navigate("/");
    });
  };
  return (
    <Box
      sx={{
        backgroundImage: "url(https://picsum.photos/id/79/800?blur=2)",
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          height: "75%",
          width: "30%",
          padding: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Login</Typography>
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          sx={{ padding: "0.5rem 1.5rem" }}
          variant="contained"
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
