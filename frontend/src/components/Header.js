import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useEffect } from "react";
import Logout from "./Logout";
import { Link } from "react-router-dom";

function Header(props) {
  const { token, setToken, setUsername } = props;
  useEffect(() => {}, [token]);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Fitness Trackr
        </Typography>
        <Box display="flex" flexDirection="row">
          <Button
            onClick={() => {
              window.location.href = "/";
            }}
            color="inherit"
          >
            Home
          </Button>
          <Button
            onClick={() => {
              window.location.href = "/routines";
            }}
            color="inherit"
          >
            Routines
          </Button>
          {token ? (
            <Button
              onClick={() => {
                window.location.href = "/myroutines";
              }}
              color="inherit"
            >
              My Routines
            </Button>
          ) : null}
          <Button
            onClick={() => {
              window.location.href = "/activities";
            }}
            color="inherit"
          >
            Activities
          </Button>
          {!token ? (
            <Button
              onClick={() => {
                window.location.href = "/login";
              }}
              color="inherit"
            >
              Login/Register
            </Button>
          ) : null}
          {token ? (
            <Button
              onClick={() => {
                setToken("");
                localStorage.setItem("user-token", "");
                localStorage.setItem("user-username", "");
                setUsername("");
                window.location.href = "/home";
              }}
              color="inherit"
            >
              Logout
            </Button>
          ) : null}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
