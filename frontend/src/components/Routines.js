import { useEffect, useState } from 'react';
import styles from './Routines.module.css'
// import { useHistory } from 'react-router-dom';
//needs work

const RoutinesList = () => {
  const [routines, setRoutines] = useState([]);
//   const history = useHistory()


  useEffect(() => {
    const getRoutines = async () => {
      const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines`)
      const data = await response.json();
      setRoutines(data);
      console.log(data)

    }
    getRoutines()
  
  }, [])

  return <>
    <h1 className={styles.title}>
      Routines
    </h1>
<div className={styles.routines}>
    {
      routines.map(routine => <div key={routine.id} className={styles.title}>
        <h3>{routine.name}</h3>
        <div>{routine.goal}</div>
        <div>{routine.creatorName}</div>
        {/* <div>{routine.activities}</div> */}


        {/* <button
          onClick={
            () => {
              history.push({pathname:`/posts/${post._id}`,
            state: post});
              console.log(post.title)
              console.log(post.description)
              console.log(post.price)
            }
          }
        >
          View Listing
        </button> */}


      </div>)

    }
    </div>
  </>


}

export default RoutinesList