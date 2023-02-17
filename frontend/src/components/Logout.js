import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Logout(props) {
  const { currentPage, setToken, setUsername, setPassword, setCurrentPage } =
    props;

  function buttonHandle() {
    setToken("");
    localStorage.setItem("user-token", "");
    localStorage.setItem("user-name", "");
    setUsername("");
    setPassword("");
    setCurrentPage("");
  }

  return (
    <div>
      {currentPage === "/home" ||
      currentPage === "/posts" ||
      currentPage === "/register" ||
      currentPage === "login" ? (
        <Link to={currentPage}>
          <button onClick={buttonHandle}>Logout</button>
        </Link>
      ) : (
        <Link to={"/home"}>
          <button onClick={buttonHandle}>Logout</button>
        </Link>
      )}
    </div>
  );
}

export default Logout;
