import React from "react";
import styles from "./homepage.module.css";

const Home = () => {
  return <body className={styles.body}>
    <h2 className={styles.home}>Welcome to Fitness Trackr</h2>

    <h3 className={styles.description}> Welcome to our fitness tracker app! Our app was developed to help people of all ages and fitness levels find new routines to add to your workouts, or share workout routines you find fun and effective! Here you can look at your workouts, routines, and upload your daily activities on this app. Sign in or register to take full advantage of the Fitness Trackr app!</h3>

    <div className={styles.picContainer}>
      <img className={styles.picture} src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/young-bodybuilder-doing-pushups-at-the-outdoor-gym-royalty-free-image-1661874908.jpg?crop=1.00xw:1.00xh;0,0&resize=980:*" id='pic' alt="" />
      <button className={styles.button}
      onClick={() => {
        window.location.href = "/login";
      }}
    >
      Login/Register
    </button>
    </div>
  </body>



}


export default Home;