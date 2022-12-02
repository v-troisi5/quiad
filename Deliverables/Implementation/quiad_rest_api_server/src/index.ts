import { PrismaClient } from "@prisma/client";
import express, { Express } from "express";

const prisma = new PrismaClient();

const app = express();

app.listen(8080, () => {
    console.info("Server is running on port ${8080}");
});
