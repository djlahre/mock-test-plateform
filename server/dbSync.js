require("dotenv").config();
const db = require("./models");
(async () => {
  await db.sequelize.sync({ alter: true });
  console.log("\nDatabase successfully synced.");
  process.exit(0);
})();
