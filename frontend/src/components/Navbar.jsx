import { Box, Paper, Stack } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "10vh",
        bgcolor: "black",
        color: "white",
        px: 10,
        position: "fixed",
        top: 0,
      }}
    >
      <Stack
        sx={{ height: "100%", width: "100%" }}
        direction="row"
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Link style={{ color: "white", textDecoration: "none" }} to="/">
          home
        </Link>
        <Link style={{ color: "white", textDecoration: "none" }} to="/requests">
          requests
        </Link>
        <Link style={{ color: "white", textDecoration: "none" }} to="/chats">
          Chats
        </Link>
      </Stack>
    </Box>
  );
};

export default Navbar;
