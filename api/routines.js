const express = require("express");
const routinesRouter = express.Router();
const { getAllRoutines, createRoutine } = require("../db");
const { createActivity } = require("../db/activities");

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

// DELETE /api/routines/:routineId

// POST /api/routines/:routineId/activities

module.exports = routinesRouter;
