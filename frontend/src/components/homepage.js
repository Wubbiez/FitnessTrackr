import React from "react";
import styles from "./homepage.module.css";

const Home = () => {
    return <div>
        <h2>Home</h2>
        <h3> welcome to our fitness tracker app! here you can look at your work outs, routines, and upload your daily activities on this app</h3>
        <div id="fitnessPic">
        <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/young-bodybuilder-doing-pushups-at-the-outdoor-gym-royalty-free-image-1661874908.jpg?crop=1.00xw:1.00xh;0,0&resize=980:*" id='pic'  alt="" />
        </div>
        <button
   onClick={() => {
     window.location.href = "/login";
   }}
 >
   Login/Register
 </button>
    </div>

   
 
}


export default Home;