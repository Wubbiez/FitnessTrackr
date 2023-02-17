import { useEffect, useState } from "react";
import styles from "./Activities.module.css";
import React from "react";
import { CreateActivity } from "./createActivity"
// import { useHistory } from 'react-router-dom';
//needs work

const ActivitiesList = (props) => {
  const { token } = props
  const [activities, setActivities] = useState([]);
  //   const history = useHistory()

  useEffect(() => {
    const getActivities = async () => {
      const response = await fetch(
        `http://fitnesstrac-kr.herokuapp.com/api/activities`
      );
      const data = await response.json();
      setActivities(data);
      console.log(data);
    };
    getActivities();
  }, []);
  if (token) {
    return (
      <>
        <button>create a new activity</button>
        <h1 className={styles.title}>Activities</h1>
        <div className={styles.routines}>
          {activities.map((activity) => (
            <div key={activity.id} className={styles.title}>
              <h3>{activity.name}</h3>
              <div>{activity.description}</div>
            </div>
          ))}
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1 className={styles.title}>Activities</h1>
        <div className={styles.routines}>
          {activities.map((activity) => (
            <div key={activity.id} className={styles.title}>
              <h3>{activity.name}</h3>
              <div>{activity.description}</div>
            </div>
          ))}
        </div>
      </>
    );

  }
}

export default ActivitiesList