const express = require("express");
const router = express.Router();
const {
  createActivity,
  getAllActivities,
  getActivityById,
  getActivityByName,
} = require("../db/activities");
const { getPublicRoutinesByActivity } = require("../db/routines");

// GET /api/activities/:activityId/routines
router.get("/:activityId/routines", async (req, res, next) => {
  const { activityId } = req.params;
  try {
    const routines = await getPublicRoutinesByActivity({ id: activityId });
    res.send(routines);
  } catch (e) {
    next({
      error: "error",
      name: "attach error",
      message: `Activity ${activityId} not found`,
    });
  }
});

// GET /api/activities

// POST /api/activities

// PATCH /api/activities/:activityId

module.exports = router;
