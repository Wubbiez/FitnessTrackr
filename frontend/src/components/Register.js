import React, { useState } from "react";
import { styled } from "@mui/material";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";
import { createaUser, loginUser } from "../api/apirequests";
const Root = styled(Grid)({
  maxHeight: "90vh",
});

const Image = styled(Grid)(({ theme }) => ({
  backgroundImage: "url(https://source.unsplash.com/random)",
  backgroundRepeat: "no-repeat",
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.grey[50]
      : theme.palette.grey[900],
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const Main = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(8, 4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center", // center horizontally
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(8, 4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(4),
}));

const LoginForm = styled("form")(({ theme }) => ({
  width: "100%", // Fix IE 11 issue.
  marginTop: theme.spacing(1),
}));

const LoginButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const RegisterButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const Login = (props) => {
  const { setUsername, setPassword, username, password, setToken, token } =
    props;
  const [loginText, setLoginText] = useState("Sign in");
  const [showButton, setShowButton] = useState(true);
  const [buttonText, setButtonText] = useState("Sign In");

  const handleClick = () => {
    setShowButton(!showButton);
    setButtonText("Register");
  };
  async function handleSubmit(event) {
    event.preventDefault();
    if (loginText === "Sign in") {
      try {
        await loginUser(username, password)
          .then((r) => {
            setToken(r.token);
          })
          .then(() => {
            window.location.href = "/home";
          });
      } catch (e) {
        console.log(e);
      }
    }
    if (loginText === "Register") {
      try {
        await createaUser(username, password).then((r) => {
          setToken(r.token);
        });
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <Root container justifyContent={"center"}>
      {/*<Image item xs={false} sm={4} md={7} />*/}
      <Main
        item
        xs={12}
        sm={8}
        md={5}
        component={StyledPaper}
        elevation={6}
        square
        justify="center" // center horizontally
        alignItems="center" // center vertically
      >
        <Typography component="h1" variant="h5">
          {loginText}
        </Typography>
        <LoginForm onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(event) => {
              event.preventDefault();
              setUsername(event.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => {
              event.preventDefault();
              setPassword(event.target.value);
            }}
          />
          <LoginButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {buttonText}
          </LoginButton>
        </LoginForm>
        {showButton && (
          <RegisterButton
            type="submit"
            variant="contained"
            color="secondary"
            onClick={() => {
              setLoginText("Register");
              handleClick();
            }}
          >
            Register
          </RegisterButton>
        )}
      </Main>
    </Root>
  );
};

export default Login;
