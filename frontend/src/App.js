import * as React from "react";
import { Routes, Route, Redirect, useParams } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Register";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import { useState } from "react";
import RoutinesList from "./components/Routines";
import ActivitiesList from "./components/Activities";
import Logout from "./components/Logout";
import CreateActivity from "./components/createActivity";
import UsersRoutines from "./components/UsersRoutines";
import MyRoutines from "./components/MyRoutines";
import Home from "./components/homepage";

export const TOKEN_STORAGE_KEY = "user-token";
export const USER_STORAGE_KEY = "user-username";
const storageToken = localStorage.getItem(TOKEN_STORAGE_KEY);
const storageUser = localStorage.getItem(USER_STORAGE_KEY);

const Main = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

function App() {
  const { routineCreator } = useParams();
  const [token, setToken] = useState(storageToken);
  const [username, setUsername] = useState(storageUser);
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");

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
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
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

          <Route
            path="/routines"
            element={<RoutinesList routineCreator={routineCreator} />}
          />
          <Route
            path="/activities"
            element={
              <ActivitiesList
                token={token}
                name={name}
                description={description}
              />
            }
          />
          <Route
            path="/createActivity"
            element={
              <CreateActivity
                token={token}
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
              />
            }
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
          <Route
            path={`/users/:routineCreator/routines`}
            element={<UsersRoutines />}
          />
          <Route
            path="/myroutines"
            element={<MyRoutines username={username} token={token} />}
          />
        </Routes>
      </Main>
    </>
  );
}
export default App;
