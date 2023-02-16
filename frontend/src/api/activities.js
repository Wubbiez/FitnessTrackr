const express = require("express");
const activitiesRouter = express.Router();
const {
  createActivity,
  getAllActivities,
  getActivityById,
  getActivityByName,
  updateActivity,
} = require("../db/activities");
const { getPublicRoutinesByActivity } = require("../db/routines");

// GET /api/activities/:activityId/routines
activitiesRouter.get("/:activityId/routines", async (req, res, next) => {
  const { activityId } = req.params;
  try {
    const routines = await getPublicRoutinesByActivity({ id: activityId });
    if (routines.length) {
      res.send(routines);
    } else {
      next({
        error: `Activity ${activityId} not found`,
        name: "Activity does not exist",
        message: `Activity ${activityId} not found`,
      });
    }
  } catch (e) {
    console.error(e);
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
activitiesRouter.patch("/:activityId", async (req, res, next) => {
  const { name, description } = req.body;
  const { activityId } = req.params;

  try {
    const getActivity = await getActivityById(activityId);
    if (!getActivity) {
      next({
        error: `Activity ${activityId} not found`,
        name: "Not Found",
        message: `Activity ${activityId} not found`,
      });
    }
    const activityByName = await getActivityByName(name);
    if (activityByName) {
      next({
        error: `An activity with name ${name} already exists`,
        name: "Duplicate Name",
        message: `An activity with name ${name} already exists`,
      });
    } else {
      res.send(await updateActivity({ id: activityId, name, description }));
    }
  } catch (e) {
    next({});
  }
});

module.exports = activitiesRouter;
