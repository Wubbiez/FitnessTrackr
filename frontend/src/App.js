import * as React from "react";
import { Routes, Route, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Register";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import { useState } from "react";
import RoutinesList from "./components/Routines";
import { useEffect } from "react";
import { getUser } from "./api/apirequests";

export const TOKEN_STORAGE_KEY = "user-token";
const storageToken = localStorage.getItem(TOKEN_STORAGE_KEY);

const Main = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

function App() {
  const [token, setToken] = useState(storageToken);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storageToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    setToken(storageToken);
    getUser(token).then((r) => {
      setUser(r);
    });
  }, [token]);

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
                setToken={setToken}
                token={token}
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
