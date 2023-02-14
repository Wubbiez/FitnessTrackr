import { Link } from "react-router-dom";
import { useEffect } from "react";
import styles from "./Header.module.css";
import Logout from "./Logout";
import logo from "../images/logo.png";

function Header(props) {
  const {
    token,
    user,
    currentPage,
    setUser,
    setToken,
    setUsername,
    setPassword,
    setValidated,
    setUserPosts,
    setPostId,
    setCurrentPage,
  } = props;
  useEffect(() => {}, [token]);
  return (
    <header className={styles.container}>
      <div className={styles.block}>
        <div className={styles.headerLogo}>
          <img src={logo} alt={""} />

          <div className={styles.welcome}>
            {token ? (
              <div className={styles.user}>Welcome {user}!</div>
            ) : (
              <div className={styles.user}>Welcome Guest!</div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.links}>
        {
          <button
            onClick={() => {
              setCurrentPage("/home");
            }}
          >
            <Link to={"/home"}>Home</Link>
          </button>
        }
        {
          <button
            onClick={() => {
              setCurrentPage("/posts");
            }}
          >
            <Link to={"/posts"}>Posts</Link>
          </button>
        }
        {!user && (
          <button
            onClick={() => {
              setCurrentPage("/register");
            }}
          >
            <Link to={"/register"}>Register</Link>
          </button>
        )}
        {!user && (
          <button
            onClick={() => {
              setCurrentPage("/login");
            }}
          >
            <Link to={"/login"}>Login</Link>
          </button>
        )}
        {user && (
          <button
            onClick={() => {
              setCurrentPage("/userposts");
            }}
          >
            <Link to={"/userposts"}>My Posts</Link>
          </button>
        )}
        {user && (
          <button
            onClick={() => {
              setCurrentPage("/createpost");
            }}
          >
            <Link to={"/createpost"}>New Post</Link>
          </button>
        )}
        {user && (
          <Logout
            token={token}
            currentPage={currentPage}
            setToken={setToken}
            setUsername={setUsername}
            setPassword={setPassword}
            setValidated={setValidated}
            setUserPosts={setUserPosts}
            setUser={setUser}
            setPostId={setPostId}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </header>
  );
}

export default Header;
