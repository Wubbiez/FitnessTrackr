const client = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

// user functions
async function createUser({ username, password }) {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(username, password) 
      VALUES($1, $2)
      ON CONFLICT (username) DO NOTHING
     RETURNING id, username;
      `,
      [username, hashedPassword]
    );
    if (user) {
      delete user.password;
      return user;
    } else {
      console.error("name already used");
    }
  } catch (error) {
    console.error();
    throw error;
  }
}

async function getUser({ username, password }) {
  try {
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;
    const comparePass = await bcrypt.compare(password, hashedPassword);
    if (comparePass) {
      const {
        rows: [user],
      } = await client.query(
        `
            SELECT id, username
            FROM users
            WHERE username = $1
              AND password = $2
          `,
        [username, hashedPassword]
      );
      delete user.password;
      return user;
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT id, username
      FROM users
      WHERE id = $1;
    `,
      [userId]
    );
    return user;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

async function getUserByUsername(userName) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT id, username, password
      FROM users
      WHERE username = $1;
    `,
      [userName]
    );
    return user;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
};
