import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

function Header() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Fitness Trackr
        </Typography>
        <Box display="flex" flexDirection="row">
          <Button color="inherit">Home</Button>
          <Button color="inherit">Routines</Button>
          <Button color="inherit">My Routines</Button>
          <Button color="inherit">Activities</Button>
          <Button color="inherit">Login/Register</Button>
          <Button color="inherit">Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
