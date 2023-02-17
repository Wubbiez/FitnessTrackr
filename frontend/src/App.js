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
import ActivitiesList from "./components/Activities";
import Logout from "./components/Logout";
import CreateActivity from "./components/createActivity";

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
  const [description, setDescription] = useState("")
  const [name, setName] = useState("")

//   const setValue = (e) => {
//     return (event) => {
//         e(event.target.value)
//     }
// }

  // useEffect(() => {
  //   const storageToken = localStorage.getItem(TOKEN_STORAGE_KEY);
  //   setToken(storageToken);
  //   getUser(token).then((r) => {
  //     setUser(r);
  //   });
  // }, [token]);

  return (
    <>
      <Header
        token={token}
        user={user}
        setUser={setUser}
        setToken={setToken}
        setUsername={setUsername}
        setPassword={setPassword}
      />
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
          <Route
            path="/activities"
            element={<ActivitiesList token={token} />}
          />
          <Route path="/createActivity" element={<CreateActivity 
          token={token}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription} />}
          />
          <Route
            path="/logout"
            element={
              <Logout
                token={token}
                setToken={setToken}
                setUsername={setUsername}
              />
            }
          />
        </Routes>
      </Main>
    </>
  );
}
export default App;
