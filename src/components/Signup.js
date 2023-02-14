import React, { useEffect, useState } from "react";
import { registerUser } from "../api";
import styles from "./Signup.module.css";

function Signup(props) {
  const { username, setUsername, password, setPassword } = props;

  async function buttonHandle() {
    try {
      await registerUser(username, password);
      setPassword("");
      setUsername("");
    } catch (e) {
      alert("That username is already taken!");
    }
  }

  return (
    <div className={styles.container}>
      <h1>Register:</h1>
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
    </div>
  );
}

export default Signup;
