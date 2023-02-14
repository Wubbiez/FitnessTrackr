import React, { useEffect } from "react";
import { loginUser, loginValidate } from "../api";
import styles from "./Login.module.css";

function Login(props) {
  const {
    username,
    setUsername,
    password,
    setPassword,
    token,
    setToken,
    validated,
    setValidated,
  } = props;

  //
  useEffect(() => {
    loginValidate(token).then((r) => {
      setValidated(r.data.data.message);
    });
  }, [token, setValidated]);

  async function buttonHandle() {
    if (!token) {
      try {
        await loginUser(username, password).then((values) => {
          setToken(values[0]);
        });
      } catch (e) {
        setValidated("Incorrect username and/or password!");
        console.error(e);
      } finally {
        setUsername("");
        setPassword("");
      }
    }
    if (token) {
      setValidated("You are already logged in");
    }
  }

  return (
    <div className={styles.container}>
      <h1>Log-in:</h1>
      <input
        placeholder="Enter Your Username"
        value={username}
        onChange={async (event) => {
          event.preventDefault();
          setUsername(event.target.value);
        }}
      ></input>
      <input
        placeholder="Enter Your Password"
        value={password}
        type={"password"}
        onChange={async (event) => {
          event.preventDefault();
          setPassword(event.target.value);
        }}
      ></input>
      <button onClick={buttonHandle}>Submit</button>
      {validated ? (
        <div>
          <p>{validated}</p>
        </div>
      ) : null}
    </div>
  );
}

export default Login;
