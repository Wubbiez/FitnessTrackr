const client = require('./client');

// database functions
async function createActivity({ name, description }) {
  // return the new activity
  try {
    const {rows: [newActivity]} =  await client.query(`
      INSERT INTO activities (name, description) 
      VALUES($1, $2)
      ON CONFLICT (name) DO NOTHING
      RETURNING id, name, description;                                            
      `, [name, description]);
    return newActivity;
  } catch (error) {
    console.error();
    throw error;
  }
}

async function getAllActivities() {
  // select and return an array of all activities
  try {
    const {rows} = await client.query(`
    SELECT * FROM activities;
    `)
    return rows;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

async function getActivityById(id) {
  try {
    const {rows: [activity]} = await client.query(`
      SELECT id, name, description
      FROM activities
      WHERE id = $1;
    `, [id]);
    return activity;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
// get activity by name
async function getActivityByName(name) {
    try {
        const {rows: [activity]} = await client.query(`
        SELECT id, name, description
        FROM activities
        WHERE name = $1;
        `, [name]);
        return activity;
    } catch (e) {
        console.error(e);
        throw e;
    }
}


async function attachActivitiesToRoutines(routines) {
    try {
        const routineIds = routines.map((routine) => routine.id);

        const setString = routines.map(
            (routine, index) => `$${ index + 1 }`
        ).join(', ');

        const {rows: activities} = await client.query(`
            SELECT activities.*, routine_activities.duration, routine_activities.count, routine_activities.id AS "routineActivityId", routine_activities."routineId"
            FROM activities
            JOIN routine_activities ON routine_activities."activityId" = activities.id
            WHERE routine_activities."routineId"
            IN (${setString});
        `, routineIds);

        const activityIdToActivity = {};
        activities.forEach((activity) => {
            activityIdToActivity[activity.id] = activity;
        });

        routines.forEach((routine) => {
            const activitiesToAdd = activities.filter((activity) => activity.routineId === routine.id);
            routine.activities = activitiesToAdd;
            }
        );

        return routines;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
// async function attachActivitiesToRoutines(routines) {
//     // no side effects
//     const routinesToReturn = [...routines];
//     const binds = routines.map((_, index) => `$${index + 1}`).join(', ');
//     const routineIds = routines.map(routine => routine.id);
//     if (!routineIds?.length) return [];
//
//     try {
//         // get the activities, JOIN with routine_activities (so we can get a routineId), and only those that have those routine ids on the routine_activities join
//         const { rows: activities } = await client.query(`
//         SELECT activities.*, routine_activities.duration, routine_activities.count, routine_activities.id AS "routineActivityId", routine_activities."routineId"
//         FROM activities
//         JOIN routine_activities ON routine_activities."activityId" = activities.id
//         WHERE routine_activities."routineId" IN (${ binds });
//       `, routineIds);
//
//         // loop over the routines
//         for(const routine of routinesToReturn) {
//             // filter the activities to only include those that have this routineId
//             const activitiesToAdd = activities.filter(activity => activity.routineId === routine.id);
//             // attach the activities to each single routine
//             routine.activities = activitiesToAdd;
//         }
//         return routinesToReturn;
//     } catch (error) {
//         throw error;
//     }
// }
// update the activity with the given id and fields
async function updateActivity({ id, ...fields }) {
    // don't try to update the id
    // do update the name and description
    // return the updated activity
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');
    if (setString.length === 0) {
        return;
    }
    try{
        const {rows: [activity]} = await client.query(`
        UPDATE activities
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
        `, Object.values(fields));
        return activity;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
