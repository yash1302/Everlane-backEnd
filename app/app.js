import express from "express";
import cors from "cors";
import { routesConstants } from "../constants/routes.constants.js";
import { userRoutes } from "./UserAccount/UserAccount.routes.js";
import { responseHandler } from "../common/messageHandler.js";
import { adminRoutes } from "./adminAccount/routes.js";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Grid from "gridfs-stream";
import { mongoConnection } from "./connection.js";


const { USERROUTES, ADMINROUTES } = routesConstants;

let gfs;
mongoConnection();

const conn = mongoose.connection;
conn.once("open", function () {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("photos");
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const routes = [
  { path: USERROUTES, router: userRoutes },
  { path: ADMINROUTES, router: adminRoutes },
];

routes.forEach((route) => app.use(route.path, route.router));

// app.get("/file", async (req, res) => {
//   try {
//     const { body } = req;
//     // const file = await gfs.files.findOne({ filename: req.params.filename });
//     const readStream = gfs.createReadStream(file.filename);
//     readStream.pipe(res);
//   } catch (error) {
//     res.send("not found");
//   }
// });

app.use((error, req, res, next) => {
  res
    .status(error.statusCode || 500)
    .send(new responseHandler(null, error.message));
});

export default app;
