import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  Input,
  InputLabel,
  Grid,
} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

function MyForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted: " + userName + " " + password);
  };

  const handleUsernameInput = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container justify="center" align="center" spacing={{ xs: 2 }}>
            <Grid item xs={6}>
              <TextField
                sx={{ mx: 4 }}
                label="Name"
                value={userName}
                onChange={handleUsernameInput}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordInput}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="secondary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}

export default MyForm;
