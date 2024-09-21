import express from "express";
import cors from "cors";
import mongoConnection from "./connection.js";
mongoConnection()

const app = express();
app.use( cors());
app.use(express.json())

export default app;