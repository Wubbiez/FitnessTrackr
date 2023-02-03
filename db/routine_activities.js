const client = require("./client");
// async function addActivityToRoutine({
//     routineId,
//     activityId,
//     count,
//     duration,
// }) {
//     try {
//         const {rows: [routineActivity]} = await client.query(`
//             INSERT INTO routine_activities("routineId", "activityId", count, duration)
//             VALUES ($1, $2, $3, $4) ON CONFLICT ("routineId", "activityId") DO NOTHING
//         RETURNING *;
//         `, [routineId, activityId, count, duration]);
//         return routineActivity;
//     } catch (e) {
//         console.error(e);
//         throw e;
//     }
// }
async function addActivityToRoutine({
    routineId,
    activityId,
    count,
    duration,
}) {
    try {
        const {rows: [routineActivity]} = await client.query(`
            INSERT INTO routine_activities("routineId", "activityId", count, duration)
            VALUES ($1, $2, $3, $4) ON CONFLICT ("routineId", "activityId") DO NOTHING
        RETURNING *;
        `, [routineId, activityId, count, duration]);
        return routineActivity;
    } catch (e) {
        console.error(e);
        throw e;
    }
                                    }
// get routine activity by id
async function getRoutineActivityById(id) {
    try {
        const { rows: [routineActivity] } = await client.query(`
        SELECT *
        FROM routine_activities
        WHERE id=$1;
        `, [id]);
        return routineActivity;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

async function getRoutineActivitiesByRoutine({ id }) {
    try {
        const { rows: routineActivities } = await client.query(`
        SELECT *
        FROM routine_activities
        WHERE "routineId"=$1;
        `, [id]);
        return routineActivities;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

async function updateRoutineActivity({ id, ...fields }) {}

async function destroyRoutineActivity(id) {}

async function canEditRoutineActivity(routineActivityId, userId) {}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
