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

async function getActivityByName(name) {}

async function attachActivitiesToRoutines(routines) {
  // select and return an array of all activities
}

async function updateActivity({ id, ...fields }) {

  // don't try to update the id
  // do update the name and description
  // return the updated activity
  // const setString = Object.keys(fields).map(
  //     (key, index) => `"${ key }"=$${ index + 1 }`
  // ).join(', ');
  //
  // try{
  //
  // } catch (e) {
  //   console.error(e);
  //   throw e;
  // }
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
