import React, { useState, useEffect } from "react";
import { deletePost, fetchAllPosts } from "../api";
import styles from "./Posts.module.css";
import { Link } from "react-router-dom";

function Posts(props) {
  const {
    token,
    setPosts,
    posts,
    setPostId,
    setDescription,
    setPrice,
    setTitle,
    setWillDeliver,
    user,
    setLocation,
    setSeller,
  } = props;

  const [postsLoaded, setPostsLoaded] = useState(false);
  const [filterString, setFilterString] = useState("");

  useEffect(() => {
    try {
      fetchAllPosts(token).then((r) => setPosts(r.data.data.posts));
    } catch (e) {
      console.error(e);
    }
    setPostsLoaded(true);
  }, [token, setPosts, postsLoaded]);

  return (
    <>
      <div className={styles.container}>
        <div>
          <h1>Posts:</h1>
        </div>
        <div>
          <form
            id="search"
            onSubmit={async (event) => {
              event.preventDefault();
              setFilterString("");
            }}
          >
            <fieldset>
              <label htmlFor="keywords">Search: </label>
              <input
                id="keywords"
                type="text"
                placeholder="enter keywords..."
                value={filterString}
                onChange={async (event) => {
                  event.preventDefault();
                  setFilterString(event.target.value);
                }}
              />
            </fieldset>
          </form>
        </div>

        <div className={styles.post}>
          {posts
            .filter((post) =>
              post.title.toLowerCase().includes(filterString.toLowerCase())
            )
            .map((post, index) => {
              return (
                <div>
                  <table className={styles.cards}>
                    <th>
                      <button
                        className={styles.titlebutton}
                        onClick={() => {
                          setPostId(post._id);
                          setDescription(post.description);
                          setPrice(post.price);
                          setTitle(post.title);
                          setWillDeliver(
                            post.willDeliver === false ? "No" : "Yes"
                          );
                          setSeller(post.author.username);
                          setLocation(post.location);
                        }}
                      >
                        <Link to={`/${post._id}`}>{post.title}</Link>
                      </button>
                    </th>
                    <tr key={`${index}_${post._id}_${post.description}`}>
                      Description:{post.description}
                    </tr>
                    <tr key={`${index}_${post._id}_${post.location}`}>
                      Location: {post.location}
                    </tr>
                    <tr key={`${index}_${post._id}_${post.price}`}>
                      Price:{post.price}
                    </tr>
                    <tr key={`${index}_${post._id}_${post.willDeliver}`}>
                      Delivery: {post.willDeliver === false ? "No" : "Yes"}
                    </tr>
                    <tr key={`${index}_${post._id}_${post.author.username}`}>
                      Seller: {post.author.username}
                    </tr>
                    {token && post.author.username === user ? (
                      <tr>
                        <button
                          onClick={(event) => {
                            try {
                              deletePost(token, post._id);
                            } catch (e) {
                              console.error(e);
                            }
                            setPostsLoaded(false);
                          }}
                        >
                          Delete
                        </button>
                      </tr>
                    ) : null}
                  </table>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Posts;
