import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useEffect } from "react";

function Header(props) {
  const { token, user, setToken, username, setUsername } = props;
  // useEffect(() => {}, [token]);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Fitness Trackr
        </Typography>
        <Box display="flex" flexDirection="row">
          <Button
            onClick={() => {
              window.location.href = "/home";
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
          <Button
            onClick={() => {
              window.location.href = "/myroutines";
            }}
            color="inherit"
          >
            My Routines
          </Button>
          <Button
            onClick={() => {
              window.location.href = "/activities";
            }}
            color="inherit"
          >
            Activities
          </Button>
          <Button
            onClick={() => {
              window.location.href = "/login";
            }}
            color="inherit"
          >
            Login/Register
          </Button>

          <Button
            onClick={() => {
              window.location.href = "/logout";
            }}
            color="inherit"
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
