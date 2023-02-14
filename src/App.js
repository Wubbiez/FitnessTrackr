import "./App.module.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Posts from "./components/Posts";
import Home from "./components/Home";
import UserPosts from "./components/UserPosts";
import CreatePost from "./components/CreatePost";
import Header from "./components/Header";
import SinglePost from "./components/SinglePost";
import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { getUser } from "./api";
import styles from "./App.module.css";

export const TOKEN_STORAGE_KEY = "user-token";
const storageToken = localStorage.getItem(TOKEN_STORAGE_KEY);

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(storageToken);
  const [posts, setPosts] = useState([]);
  const [validated, setValidated] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const [postId, setPostId] = useState("");
  const [currentPage, setCurrentPage] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [willDeliver, setWillDeliver] = useState("");
  const [location, setLocation] = useState("");
  const [seller, setSeller] = useState("");

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storageToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    setToken(storageToken);
    getUser(token).then((r) => {
      setUser(r);
    });
  }, [token]);
  return (
    <div>
      <Header
        token={token}
        user={user}
        currentPage={currentPage}
        setUser={setUser}
        setToken={setToken}
        setUsername={setUsername}
        setPassword={setPassword}
        setValidated={setValidated}
        setUserPosts={setUserPosts}
        setPostId={setPostId}
        setCurrentPage={setCurrentPage}
      />
      <main className={styles.main}>
        <Switch>
          <Route exact path={"/"}>
            <Redirect to="/home" />
          </Route>
          <Route exact path={"/home"}>
            <Home />
          </Route>
          <Route exact path={"/register"}>
            <Signup
              setUsername={setUsername}
              setPassword={setPassword}
              username={username}
              password={password}
            />
          </Route>
          <Route exact path={"/login"}>
            <Login
              setUsername={setUsername}
              setPassword={setPassword}
              username={username}
              password={password}
              setToken={setToken}
              token={token}
              validated={validated}
              setValidated={setValidated}
            />
          </Route>
          <Route exact path={"/posts"}>
            <Posts
              token={token}
              setPosts={setPosts}
              posts={posts}
              postId={postId}
              setPostId={setPostId}
              setDescription={setDescription}
              setPrice={setPrice}
              setWillDeliver={setWillDeliver}
              setTitle={setTitle}
              setLocation={setLocation}
              setSeller={setSeller}
              user={user}
            />
          </Route>
          <Route exact path={"/userposts"}>
            <UserPosts
              token={token}
              setUserPosts={setUserPosts}
              userPosts={userPosts}
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              price={price}
              setPrice={setPrice}
              willDeliver={willDeliver}
              setWillDeliver={setWillDeliver}
              location={location}
              setLocation={setLocation}
            />
          </Route>
          <Route exact path={"/createpost"}>
            <CreatePost
              token={token}
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              price={price}
              setPrice={setPrice}
              willDeliver={willDeliver}
              setWillDeliver={setWillDeliver}
              location={location}
              setLocation={setLocation}
            />
          </Route>
          <Route exact path={`/${postId}`}>
            <SinglePost
              user={user}
              token={token}
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              price={price}
              setPrice={setPrice}
              willDeliver={willDeliver}
              setWillDeliver={setWillDeliver}
              location={location}
              setLocation={setLocation}
              postId={postId}
              seller={seller}
              setSeller={setSeller}
              posts={posts}
            />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
