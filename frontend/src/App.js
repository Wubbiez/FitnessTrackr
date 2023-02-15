import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginGPT from "./components/Register";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";

const Main = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

function App() {
  return (
    <>
      <Header />
      <Main>
        <LoginGPT />
      </Main>
    </>
  );
}
export default App;
