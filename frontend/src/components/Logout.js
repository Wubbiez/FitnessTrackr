import React from "react";
import { Link } from "react-router-dom";

function Logout(props) {
  const { setToken, setUsername } = props;

  function wipeData() {
    setToken("");
    localStorage.setItem("user-token", "");
    localStorage.setItem("user-username", "");
    setUsername("");
  }

  wipeData();

  return window.location.href === "/home" ||
    window.location.href === "/routines" ||
    window.location.href === "/activities" ||
    window.location.href === "/login" ? (
    <Link to={window.location.href} />
  ) : (
    <Link to={"/home"} />
  );
}

export default Logout;
