import styles from "./Home.module.css";
import React from "react";

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Welcome to Stranger's Things!</h1>
      </div>

      <div className={styles.welcome}>
        <p>
          This is a social website where you can buy and sell goods from
          strangers! Not to be confused with the Netflix original series
          (besides the similar logo).
        </p>
        <p>Please create an account or log-in to begin!</p>
      </div>

      <div className={styles.intro}></div>
    </div>
  );
}

export default Home;
