const express = require("express");
const routineActivitiesRouter = express.Router();
const {
  destroyRoutineActivity,
  getRoutineActivityById,
  updateRoutineActivity,
} = require("../db/routine_activities");
const { getAllRoutines } = require("../db/routines");
const {
  getActivityById,
  getActivityByName,
  updateActivity,
} = require("../db/activities");

// PATCH /api/routine_activities/:routineActivityId
routineActivitiesRouter.patch("/:routineActivityId", async (req, res, next) => {
  const { duration, count } = req.body;
  const { routineActivityId } = req.params;

  const routineActivity = await getRoutineActivityById(routineActivityId);
  const allRoutines = await getAllRoutines();
  const update = await updateRoutineActivity({
    id: routineActivity.id,
    duration,
    count,
  });
  try {
    allRoutines.map((routine) => {
      routine.activities.filter((activity) => {
        if (
          req.user.id === routine.creatorId &&
          routineActivity.id === activity.id
        ) {
          res.send(update);
        } else if (
          routineActivity.id === activity.id &&
          req.user.id !== routine.creatorId
        ) {
          res.status(403);
          next({
            error: `User ${req.user.username} is not allowed to update ${routine.name}`,
            name: "No authentication",
            message: `User ${req.user.username} is not allowed to update ${routine.name}`,
          });
        }
      });
    });
  } catch (e) {
    next(e);
  }
});

// DELETE /api/routine_activities/:routineActivityId
routineActivitiesRouter.delete(
  "/:routineActivityId",
  async (req, res, next) => {
    const { routineActivityId } = req.params;

    if (req.user) {
      try {
        const allRoutines = await getAllRoutines();
        const routineActivity = await getRoutineActivityById(routineActivityId);
        const destroy = await destroyRoutineActivity(routineActivity.id);

        allRoutines.map((routine) => {
          routine.activities.filter((activity) => {
            if (
              routineActivity.id === activity.id &&
              req.user.id === routine.creatorId
            ) {
              res.send(destroy);
            } else if (
              routineActivity.id === activity.id &&
              req.user.id !== routine.creatorId
            ) {
              res.status(403);
              next({
                error: `User ${req.user.username} is not allowed to delete ${routine.name}`,
                name: "No authentication",
                message: `User ${req.user.username} is not allowed to delete ${routine.name}`,
              });
            }
          });
        });
      } catch (e) {
        next(e);
      }
    }
  }
);
module.exports = routineActivitiesRouter;
