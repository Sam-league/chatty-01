import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { socket, UserContext } from "../App";
import { Url } from "../utils";

const Home = () => {
  const [User, setUser] = useContext(UserContext);
  const [profiles, setProfiles] = useState(null);
  const [open, setOpen] = useState(false);
  const fetchProfiles = () => {
    axios(`${Url}/fetchProfiles/${User?._id}`).then((res) => {
      setProfiles(res.data.response);
    });
  };
  useEffect(() => {
    User && fetchProfiles();
  }, []);

  socket.on("new user", () => {
    fetchProfiles();
  });

  const sendRequest = (id) => {
    axios
      .post(`${Url}/sendRequest`, { user_id: id, request_id: User?._id })
      .then(() => {
        setOpen(true);
        axios(`${Url}/fetchProfiles/${User?._id}`).then((res) => {
          setProfiles(res.data.response);
        });
      });
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          request sent successfully
        </Alert>
      </Snackbar>
      <Typography
        fontSize={28}
        fontWeight={600}
        sx={{ textDecoration: "underline" }}
      >
        New Profiles
      </Typography>
      <Grid container sx={{ mt: 1 }} spacing={5}>
        {profiles?.map((p) => (
          <Grid item xs={3}>
            <Card elevation={4}>
              <CardContent>
                <Typography variant="h6">{p.name}</Typography>
                <Typography>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Iusto, laborum?
                </Typography>
                <Button
                  disabled={p.status ? true : false}
                  onClick={() => sendRequest(p._id)}
                  size="small"
                  variant="contained"
                >
                  {p.status ? "requested.." : "request"}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
