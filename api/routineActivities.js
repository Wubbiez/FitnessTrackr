const express = require("express");
const routineActivitiesRouter = express.Router();
const {
  destroyRoutineActivity,
  getRoutineActivityById,
  updateRoutineActivity,
  canEditRoutineActivity,
} = require("../db/routine_activities");
const { getAllRoutines, getRoutineById } = require("../db/routines");

// PATCH /api/routine_activities/:routineActivityId
routineActivitiesRouter.patch("/:routineActivityId", async (req, res, next) => {
  const { duration, count } = req.body;
  const { routineActivityId } = req.params;

  const allRoutines = await getAllRoutines();

  try {
    const routineActivity = await getRoutineActivityById(routineActivityId);
    const routine = await getRoutineById(routineActivity.routineId);
    if (!routineActivity) {
      next({
        error: `Routine Activity ${routineActivityId} not found`,
        name: "Not Found",
        message: `Routine Activity ${routineActivityId} not found`,
      });
    } else if (req.user.id !== routine.creatorId) {
      res.status(403);
      next({
        error: `User ${req.user.username} is not allowed to update ${routine.name}`,
        name: "No authentication",
        message: `User ${req.user.username} is not allowed to update ${routine.name}`,
      });
    } else {
      const update = await updateRoutineActivity({
        id: routineActivity.id,
        duration,
        count,
      });
      console.log(update);
      res.send(update);
    }
  } catch (e) {
    next(e);
  }
});

// DELETE /api/routine_activities/:routineActivityId
routineActivitiesRouter.delete(
  "/:routineActivityId",
  async (req, res, next) => {
    const { routineActivityId } = req.params;

    try {
      const routineActivity = await getRoutineActivityById(routineActivityId);
      const routine = await getRoutineById(routineActivity.routineId);
      if (!routineActivity) {
        next({
          error: `Routine Activity ${routineActivityId} not found`,
          name: "Not Found",
          message: `Routine Activity ${routineActivityId} not found`,
        });
      } else if (req.user.id !== routine.creatorId) {
        res.status(403);
        next({
          error: `User ${req.user.username} is not allowed to delete ${routine.name}`,
          name: "No authentication",
          message: `User ${req.user.username} is not allowed to delete ${routine.name}`,
        });
      } else {
        const destroy = await destroyRoutineActivity(routineActivity.id);
        res.send(destroy);
      }
    } catch (e) {
      next(e);
    }
  }
);
module.exports = routineActivitiesRouter;
