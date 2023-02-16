const { createTables, dropTables } = require("../frontend/src/db/seedData");

const setup = async () => {
  console.log("--- JEST SETUP ---");
  await dropTables();
  await createTables();
};

module.exports = setup;
