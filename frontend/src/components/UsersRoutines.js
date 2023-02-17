import { getUsersRoutines } from "../api/apirequests";
import { useEffect, useState } from "react";

const UsersRoutines = () => {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    getUsersRoutines().then((routines) => {
      setRoutines(routines);
    });
  }, []);

  return (
    <div>
      <h1>My Routines</h1>
      {routines.map((routine) => {
        return (
          <div key={routine.id}>
            <h2>{routine.name}</h2>
            <p>{routine.goal}</p>
            <p>{routine.creatorName}</p>
            <p>{routine.isPublic}</p>
            <p>{routine.activities}</p>
          </div>
        );
      })}
    </div>
  );
};
