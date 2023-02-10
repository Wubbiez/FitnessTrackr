const express = require("express");
const routineActivitiesRouter = express.Router();
const { destroyRoutineActivity } = require("../db/routine_activities");
// PATCH /api/routine_activities/:routineActivityId

// DELETE /api/routine_activities/:routineActivityId
routineActivitiesRouter.delete(
  "/:routineActivityId",
  async (req, res, next) => {
    const { routineActivityId } = req.params;

    try {
      await destroyRoutineActivity(routineActivityId);
    } catch (e) {
      next(e);
    }
  }
);
module.exports = routineActivitiesRouter;
