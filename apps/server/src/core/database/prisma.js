const { PrismaClient } = require("@prisma/client");
const { env } = require("../../config");

const prisma = new PrismaClient({
  log: env.isDevelopment ? ["warn", "error"] : ["error"],
});

module.exports = prisma;
