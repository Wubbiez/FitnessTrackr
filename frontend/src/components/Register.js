import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  Input,
  InputLabel,
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
      <Container>
        <Box
          sx={{
            my: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "left",
          }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              value={userName}
              onChange={handleUsernameInput}
            />

            <FormControl>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordInput}
              />
            </FormControl>

            <Box textAlign="center">
              <Button type="submit" variant="contained" color="secondary">
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default MyForm;
