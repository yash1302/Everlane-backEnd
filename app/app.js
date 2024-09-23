import express from "express";
import cors from "cors";
import mongoConnection from "./connection.js";
import { routesConstants } from "../constants/routes.constants.js";
import { userRoutes } from "./UserAccount/UserAccount.routes.js";
import { responseHandler } from "../common/messageHandler.js";

const { USERROUTES } = routesConstants;

mongoConnection();

const app = express();
app.use(cors());
app.use(express.json());

const routes = [{ path: USERROUTES, router: userRoutes }];

routes.forEach((route) => app.use(route.path, route.router));

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).send(new responseHandler(null, error.message));
});

export default app;
