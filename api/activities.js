const express = require("express");
const activitiesRouter = express.Router();
const {
  createActivity,
  getAllActivities,
  getActivityById,
  getActivityByName,
} = require("../db/activities");
const { getPublicRoutinesByActivity } = require("../db/routines");

// GET /api/activities/:activityId/routines
activitiesRouter.get("/:activityId/routines", async (req, res, next) => {
  const { activityId } = req.params;
  try {
    const routines = await getPublicRoutinesByActivity({ id: activityId });
    res.send(routines);
  } catch (e) {
    next({
      error: `Activity ${activityId} not found`,
      name: "Activity does not exist",
      message: `Activity ${activityId} not found`,
    });
  }
});

// GET /api/activities
activitiesRouter.get("/", async (req, res, next) => {
  try {
    const getActivities = await getAllActivities();
    res.send(getActivities);
  } catch (e) {
    next({
      error: "There are no activities!",
      name: "Activity does not exist",
      message: `There are no activities!`,
    });
  }
});
// POST /api/activities
activitiesRouter.post("/", async (req, res, next) => {
  const { name, description } = req.body;
  try {
    if (req.user) {
      const checkActivity = await getActivityByName(name);
      if (checkActivity) {
        next({
          error: `An activity with name ${name} already exists`,
          name: "Duplicate Name",
          message: `An activity with name ${name} already exists`,
        });
      }
      const createUserActivity = await createActivity({ name, description });
      res.send(createUserActivity);
    }
  } catch (e) {
    next(e);
  }
});
// PATCH /api/activities/:activityId

module.exports = activitiesRouter;
