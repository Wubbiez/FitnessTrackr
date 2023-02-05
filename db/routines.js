const client = require("./client");
const { attachActivitiesToRoutines } = require("./activities");
const {getUserByUsername} = require("./users");

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try{
    const{rows:[routine]}= await client.query(`
    INSERT INTO routines ("creatorId", "isPublic", name, goal)
    VALUES ($1,$2,$3,$4)
    ON CONFLICT (name) DO NOTHING
    RETURNING*;
    `, [creatorId, isPublic, name, goal]);
    return routine;
  }catch(e){
    console.error(e)
    throw e;
  }
  }


async function getRoutineById(id) {
    try {
        const {rows:routine} = await client.query(`
        SELECT * FROM routines
        WHERE id = $1;
    `, [id]);
    return routine;
    } catch (e) {
    console.error(e);
    throw e;
    }
}

async function getRoutinesWithoutActivities() {
    try {
        const {rows:routine} = await client.query(`
        SELECT * FROM routines;
    `, );
    return routine;
    } catch (e) {
    console.error(e);
    throw e;
    }
}

async function getAllRoutines() {
    try {
        const { rows: routines } = await client.query(`
        SELECT routines.*, users.username AS "creatorName"
        FROM routines 
        JOIN users ON routines."creatorId" = users.id
        `);

        return attachActivitiesToRoutines(routines);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getAllPublicRoutines() {
    try {
        const {rows:routine} = await client.query(`
        SELECT r.*, u.username as "creatorName" FROM routines r
        JOIN users u ON r."creatorId" = u.id
        WHERE "isPublic" = true;
    `, );
        console.log(routine);
        return attachActivitiesToRoutines(routine);
    } catch (e) {
    console.error(e);
    throw e;
    }


}
async function getAllRoutinesByUser({username}) {
    const user = await getUserByUsername( username );
    try {
        const {rows:routine} = await client.query(`
        SELECT r.*, u.username as "creatorName" FROM routines r
        JOIN users u ON r."creatorId" = u.id
        WHERE "creatorId" = $1;
    `, [user.id]);
    return attachActivitiesToRoutines(routine);
    } catch (e) {
    console.error(e);
    throw e;
    }
}

async function getPublicRoutinesByUser({ username }) {
try {
  const {rows: routine} = await client.query(`
    SELECT r.*, u.username as "creatorName" FROM routines r
    JOIN users u ON r."creatorId" = u.id
    WHERE "creatorId" = (SELECT id FROM users WHERE username = $1)
    AND "isPublic" = true;
  `, [username]);
  return attachActivitiesToRoutines(routine);
} catch (e) {
  console.error(e);
    throw e;
}
}
async function getPublicRoutinesByActivity({ id }) {
    try {
        const {rows: routine} = await client.query(`
        SELECT routines.*, users.username as "creatorName" 
        FROM routines 
        JOIN users ON routines."creatorId" = users.id
        JOIN routine_activities ON routine_activities."routineId" = routines.id
        WHERE routines."isPublic" = true
        AND routine_activities."activityId" = $1
        
        `, [id]);
        return attachActivitiesToRoutines(routine);
    } catch (e) {
        console.error(e);
        throw e;
    }

}
async function updateRoutine({ id, ...fields }) {
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');

    try{
        const {rows: [routine]} = await client.query(`
        UPDATE routines
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
        `, Object.values(fields));
        return routine;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
async function destroyRoutine(id) {
try {
   const {rows: [routine]} = await client.query(`
    DELETE FROM routine_activities
    WHERE "routineId" = $1
    RETURNING *;
    `, [id]);
   return routine;
} catch (e) {
    console.error(e);
    throw e;
}
}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
