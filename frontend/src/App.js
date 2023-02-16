import * as React from "react";
import { Routes, Route, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Register";
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
        <Routes>
          <Route exact path="/home" />
          <Route path="/login" element={<Login />} />
          {/*<Route path="/signup" element={<Signup />} />*/}
        </Routes>
      </Main>
    </>
  );
}
export default App;
