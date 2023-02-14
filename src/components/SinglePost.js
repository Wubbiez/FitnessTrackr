import React from "react";
import { useEffect, useState } from "react";
import { postMessage } from "../api";
import styles from "./SinglePosts.module.css";

function SinglePost(props) {
  const {
    user,
    token,
    title,
    description,
    price,
    willDeliver,
    postId,
    location,
    seller,
    posts,
  } = props;

  const [messageText, setMessageText] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [postMessages, setPostMessages] = useState([]);

  useEffect(() => {
    posts.map((post) => {
      return post._id === postId ? setPostMessages(post.messages) : null;
    });
  }, [sendingMessage]);

  const useToggle = (initialState) => {
    const [toggleValue, setToggleValue] = useState(initialState);

    const toggler = () => {
      setToggleValue(!toggleValue);
    };
    return [toggleValue, toggler];
  };

  const [toggle, setToggle] = useToggle();

  return (
    <>
      <div className={styles.container}>
        <div>
          <h1>Expanded post view</h1>
        </div>
        <div className={styles.cards}>
          <div>
            <table>
              <th>{title}</th>
              <tr>Description: {description}</tr>
              <tr>Location: {location}</tr>
              <tr>Price: {price}</tr>
              <tr>Delivery: {willDeliver}</tr>
              <tr>Seller: {seller}</tr>
            </table>
          </div>
          {token && seller !== user ? (
            <div className={styles.contact}>
              <button onClick={setToggle}>Contact Seller!</button>
            </div>
          ) : null}
        </div>
        <div className={styles.messageForm}>
          {toggle && (
            <form
              id="sendMessage"
              onSubmit={async (event) => {
                event.preventDefault();
                setSendingMessage(true);
                setMessageText("");

                try {
                  await postMessage(token, postId, messageText);
                } catch (e) {
                  console.error(e);
                } finally {
                  setSendingMessage(false);
                }
              }}
            >
              <fieldset>
                <label htmlFor="messageText">Type Message Here:</label>
                <input
                  id="messageText"
                  type="text"
                  placeholder="..."
                  value={messageText}
                  onChange={async (event) => {
                    event.preventDefault();
                    setMessageText(event.target.value);
                  }}
                />
              </fieldset>
              <button>SEND</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default SinglePost;
