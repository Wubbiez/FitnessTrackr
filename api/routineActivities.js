const express = require("express");
const routineActivitiesRouter = express.Router();
const {
  destroyRoutineActivity,
  getRoutineActivityById,
} = require("../db/routine_activities");
const { getAllRoutines } = require("../db/routines");
// PATCH /api/routine_activities/:routineActivityId

// DELETE /api/routine_activities/:routineActivityId
routineActivitiesRouter.delete(
  "/:routineActivityId",
  async (req, res, next) => {
    const { routineActivityId } = req.params;

    if (req.user) {
      try {
        const allRoutines = await getAllRoutines();
        const routineActivity = await getRoutineActivityById(routineActivityId);

        await allRoutines.map((routine) => {
          routine.activities.filter((activity) => {
            if (req.user.id == routine.creatorId) {
              if (routineActivity.id === activity.id) {
                res.send(routineActivity);
                destroyRoutineActivity(activity.id);
              }
            } else {
              res.status(403);
              next({
                error: "No authentication",
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
