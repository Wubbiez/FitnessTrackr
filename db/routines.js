const client = require("./client");

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
  const {rows: [routine]} = await client.query(`
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
    SELECT * FROM routines
    WHERE id NOT IN (routine_activities."routineId")
  `, );
  return routine;
} catch (e) {
  console.error(e);
  throw e;
}
}

async function getAllRoutines() {

}

async function getAllPublicRoutines() {

}

async function getAllRoutinesByUser({ username }) {

}

async function getPublicRoutinesByUser({ username }) {

}

async function getPublicRoutinesByActivity({ id }) {

}

async function updateRoutine({ id, ...fields }) {

}

async function destroyRoutine(id) {

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
