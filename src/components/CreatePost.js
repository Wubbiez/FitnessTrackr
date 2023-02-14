import React, { useState, useEffect } from "react";
import { createPost } from "../api";
import styles from "./CreatePost.module.css";

function CreatePost(props) {
  const {
    token,
    title,
    setTitle,
    description,
    setDescription,
    price,
    setPrice,
    willDeliver,
    setWillDeliver,
    location,
    setLocation,
  } = props;

  useEffect(() => {
    setTitle("");
    setWillDeliver(false);
    setLocation("");
    setDescription("");
    setPrice("");
  }, [token]);

  return (
    <div className={styles.container}>
      <div>
        <h1>Create Post:</h1>
      </div>

      <div className={styles.editForm}>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            setTitle("");
            setDescription("");
            setPrice("");
            setWillDeliver(false);
            setLocation("");
            try {
              await createPost(
                token,
                title,
                description,
                price,
                willDeliver,
                location
              );
            } catch (e) {
              console.error(e);
            }
          }}
        >
          <fieldset>
            <label htmlFor="title">Item Title: </label>
            <input
              id="title"
              type="text"
              required={true}
              placeholder="Enter Item Title"
              value={title}
              onChange={async (event) => {
                event.preventDefault();
                setTitle(event.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <label htmlFor="description">Description:</label>
            <input
              id="description"
              type="text"
              required={true}
              placeholder="Enter Item Description"
              value={description}
              onChange={async (event) => {
                event.preventDefault();
                setDescription(event.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <label htmlFor="price">Price:</label>
            <input
              id="price"
              type="number"
              required={true}
              placeholder="Enter Item Price"
              value={price}
              onChange={async (event) => {
                event.preventDefault();
                setPrice(event.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <label htmlFor="location">Location: </label>
            <input
              id="location"
              required={true}
              type="text"
              value={location}
              onChange={async (event) => {
                event.preventDefault();
                setLocation(event.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <label htmlFor="willDeliver">Will Deliver:</label>
            <select
              name="deliveryOption"
              id="willDeliver"
              required={true}
              value={willDeliver}
              onChange={(event) => {
                setWillDeliver(event.target.value);
              }}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </fieldset>
          <button>Submit!</button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
