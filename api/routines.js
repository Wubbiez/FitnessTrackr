const express = require("express");
const routinesRouter = express.Router();
const { getAllRoutines, createRoutine, updateRoutine } = require("../db");
const {
  createActivity,
  getActivityById,
  getActivityByName,
  updateActivity,
} = require("../db/activities");
const { getRoutineById } = require("../db/routines");

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

// POST /api/routines/:routineId/activities

module.exports = routinesRouter;
