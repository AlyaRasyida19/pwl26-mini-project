import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client.ts";
import "dotenv/config";

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "books_api",
  connectionLimit: 5
});

const prisma = new PrismaClient({
  adapter
});

export default prisma;
