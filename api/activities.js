const express = require('express');
const router = express.Router();
const {createActivity, getAllActivities, getActivityById, getActivityByName} = require('../db/activities');
const {getPublicRoutinesByActivity} = require('../db/routines');

// GET /api/activities/:activityId/routines
router.get('/:activityId/routines', async (req, res, next) => {
    try {
        const {activityId} = req.params;
        const routines = await getPublicRoutinesByActivity({id: activityId});
        res.send(routines);
    } catch (e) {
        next(e);
    }
});

// GET /api/activities

// POST /api/activities

// PATCH /api/activities/:activityId

module.exports = router;
