const express = require("express");
const routinesRouter = express.Router();
const { getAllRoutines, createRoutine, updateRoutine } = require("../db");
const {
  createActivity,
  getActivityById,
  getActivityByName,
  updateActivity,
} = require("../db/activities");
const { getRoutineById, destroyRoutine } = require("../db/routines");

// GET /api/routines
routinesRouter.get("/", async (req, res, next) => {
  try {
    const routines = await getAllRoutines();
    res.send(routines);
  } catch (e) {
    next(e);
  }
});
// POST /api/routines

routinesRouter.post("/", async (req, res, next) => {
  const { isPublic, name, goal } = req.body;
  try {
    if (req.user.id) {
      const createARoutine = await createRoutine({
        creatorId: req.user.id,
        isPublic,
        name,
        goal,
      });
      res.send(createARoutine);
    }
  } catch (e) {
    next({
      error: `You must be logged in to perform this action`,
      name: "Login Error",
      message: `You must be logged in to perform this action`,
    });
  }
});

// PATCH /api/routines/:routineId

routinesRouter.patch("/:routineId", async (req, res, next) => {
  const { isPublic, name, goal } = req.body;
  const { routineId } = req.params;

  try {
    const getRoutine = await getRoutineById(routineId);
    if (!getRoutine) {
      console.log("not found");
      next({
        error: `Routine ${routineId} not found`,
        name: "Not Found",
        message: `Routine ${routineId} not found`,
      });
    }
    if (req.user.id !== getRoutine.creatorId) {
      console.log("not allowed");
      res.status(403);
      next({
        error: `User ${req.user.username} is not allowed to update ${getRoutine.name}`,
        name: "No authentication",
        message: `User ${req.user.username} is not allowed to update ${getRoutine.name}`,
      });
    } else {
      const update = await updateRoutine({
        id: routineId,
        isPublic,
        name,
        goal,
      });
      res.send(update);
    }
  } catch (e) {
    next({
      error: `You must be logged in to perform this action`,
      name: "Login Error",
      message: `You must be logged in to perform this action`,
    });
  }
});
// DELETE /api/routines/:routineId
routinesRouter.delete("/:routineId", async (req, res, next) => {
  const { routineId } = req.params;
  try {
    const getRoutine = await getRoutineById(routineId);
    if (!getRoutine) {
      next({
        error: `Routine ${routineId} not found`,
        name: "Not Found",
        message: `Routine ${routineId} not found`,
      });
    }
    if (req.user.id !== getRoutine.creatorId) {
      res.status(403);
      next({
        error: `User ${req.user.username} is not allowed to delete ${getRoutine.name}`,
        name: "No authentication",
        message: `User ${req.user.username} is not allowed to delete ${getRoutine.name}`,
      });
    } else {
      const removeRoutine = await destroyRoutine(routineId);
      res.send(removeRoutine);
    }
  } catch (e) {
    next({
      error: `You must be logged in to perform this action`,
      name: "Login Error",
      message: `You must be logged in to perform this action`,
    });
  }
});
// POST /api/routines/:routineId/activities
routinesRouter.post("/:routineId/activities", async (req, res, next) => {
  const { routineId } = req.params;
  const { activityId, count, duration } = req.body;
  try {
    const [getRoutine] = await getRoutineById(routineId);
    if (!getRoutine) {
      console.log("not found");
      next({
        error: `Routine ${routineId} not found`,
        name: "Not Found",
        message: `Routine ${routineId} not found`,
      });
    }
    if (req.user.id !== getRoutine.creatorId) {
      console.log("not allowed");
      res.status(403);
      next({
        error: `User ${req.user.username} is not allowed to add activities to ${getRoutine.name}`,
        name: "No authentication",
        message: `User ${req.user.username} is not allowed to add activities to ${getRoutine.name}`,
      });
    } else {
      const create = await createActivity({
        routineId,
        activityId,
        count,
        duration,
      });
      res.send(create);
    }
  } catch (e) {
    next({
      error: `You must be logged in to perform this action`,
      name: "Login Error",
      message: `You must be logged in to perform this action`,
    });
  }
});

module.exports = routinesRouter;
