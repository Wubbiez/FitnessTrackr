// import { useEffect, useState } from "react";
// import styles from "./Activities.module.css";
// import React from "react";
// import { getAllActivities } from "../db/activities";
// // import { useHistory } from 'react-router-dom';
// //needs work
//
// const ActivitiesList = (props) => {
//   const { token } = props;
//   const [activities, setActivities] = useState([]);
//   const [activitiesLoaded, setPostsLoaded] = useState([]);
//   //   const history = useHistory()
//
//   useEffect(() => {
//     try {
//       getAllActivities(token).then((r) => setActivities(r.activities));
//     } catch (e) {
//       console.error(e);
//     }
//     setPostsLoaded(true);
//   }, [token, setActivities, activitiesLoaded]);
//
//   return (
//     <>
//       <h1 className={styles.title}>Activities</h1>
//       <div className={styles.routines}>
//         {activities.map((activity) => (
//           <div key={activity.id} className={styles.title}>
//             <h3>{activity.name}</h3>
//             <div>{activity.description}</div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };
//
// export default ActivitiesList;
