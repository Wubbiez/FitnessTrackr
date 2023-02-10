const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  getPublicRoutinesByUser,
  getAllRoutinesByUser,
} = require("../db");

// POST /api/users/register
userRouter.post("/register", async (req, res, next) => {
  console.log(req.body);
  try {
    const { username, password } = req.body;

    const queriedUser = await getUserByUsername(username);
    console.log(queriedUser);
    if (queriedUser) {
      console.log("entered");
      res.status(401);
      next({
        error: "Error",
        name: "UserExistsError",
        message: `User ${queriedUser.username} is already taken.`,
      });
    } else if (password.length < 8) {
      res.status(401);
      next({
        error: "Error",
        name: "PasswordLengthError",
        message: "Password Too Short!",
      });
    } else {
      const user = await createUser({
        username,
        password,
      });
      if (!user) {
        next({
          name: "UserCreationError",
          message: "There was a problem registering you. Please try again.",
        });
      } else {
        const token = jwt.sign(
          { id: user.id, username: user.username },
          JWT_SECRET,
          { expiresIn: "1w" }
        );
        res.send({ user, message: "you're signed up!", token });
      }
    }
  } catch ({ error, name, message }) {
    next({ error, name, message });
  }
});
// POST /api/users/login
userRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }
  try {
    const user = await getUser({ username, password });
    if (!user) {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    } else {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "1w" }
      );
      res.send({ user, message: "you're logged in!", token });
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// GET /api/users/me
userRouter.get("/me", async (req, res, next) => {
  try {
    if (req.user) {
      res.send(req.user);
    } else {
      res.status(401);
      next({
        error: "You must be logged in to perform this action",
        name: "Invalid User",
        message: "You must be logged in to perform this action",
      });
    }
  } catch (e) {
    next(e);
  }
});
// GET /api/users/:username/routines
userRouter.get("/:username/routines", async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await getUserByUsername(username);
    if (!user) {
      next({
        name: "NoUser",
        message: `Error looking up user ${username}`,
      });
    } else if (req.user && user.id === req.user.id) {
      const routines = await getAllRoutinesByUser({ username: username });
      res.send(routines);
    } else {
      const publicRoutines = await getPublicRoutinesByUser({ username });
      res.send(publicRoutines);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = userRouter;
