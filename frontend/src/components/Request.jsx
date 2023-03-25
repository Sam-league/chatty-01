import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { socket, UserContext } from "../App";
import { Url } from "../utils";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const Request = () => {
  const [requests, setRequests] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(null);
  const [User, setUser] = useContext(UserContext);

  const fetchRequests = () => {
    axios(`${Url}/fetchRequest/${User?._id}`).then((res) => {
      setRequests(res.data.response);
    });
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  socket.on(`${User?._id} request`, () => {
    fetchRequests();
  });

  const handleClose = () => {
    setOpen(false);
  };

  const acceptRequest = (id) => {
    axios(`${Url}/acceptRequest/${id}`).then((res) => {
      setOpen(true);
      setName(res.data.response.request_id.name);
    });
  };
  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          you accepted {name}
        </Alert>
      </Snackbar>
      <Typography
        fontSize={28}
        fontWeight={600}
        sx={{ textDecoration: "underline", mb: 5 }}
      >
        Requests
      </Typography>
      {requests?.map((r) => (
        <Paper
          key={r._id}
          sx={{
            mt: 1,
            padding: 2,
            bgcolor: "lightblue",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {r.request_id.name}
          <ButtonGroup size="small">
            <Button>
              <CloseIcon />
            </Button>
            <Button onClick={() => acceptRequest(r._id)}>
              <CheckIcon />
            </Button>
          </ButtonGroup>
        </Paper>
      ))}
    </Box>
  );
};

export default Request;
