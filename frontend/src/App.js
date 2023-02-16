import * as React from "react";
import { Routes, Route, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Register";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import { useState } from "react";
import RoutinesList from "./components/Routines";

const Main = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route exact path="/home" />
          <Route
            path="/login"
            element={
              <Login
                setUsername={setUsername}
                setPassword={setPassword}
                username={username}
                password={password}
              />
            }
          />
          {/*<Route path="/signup" element={<Signup />} />*/}
          <Route path="/routines" element={<RoutinesList />} />
        </Routes>
      </Main>
    </>
  );
}
export default App;
