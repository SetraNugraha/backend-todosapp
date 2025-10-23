import express, { Router } from "express";
import { TaskRoute } from "../tasks/task.route";
import { IRouting } from "../../types/routing.type";

const router: Router = express.Router();

const allRoutes: IRouting[] = [...TaskRoute];

allRoutes.forEach((route) => {
  if (route.middleware) {
    router[route.method](route.url, [...route.middleware], route.controller);
  } else {
    router[route.method](route.url, route.controller);
  }
});

export default router;
