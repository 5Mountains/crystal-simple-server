import { Router } from "express";

const router = Router();

import {
  loginHandler,
  registerHandler,
  logoutHandler,
} from "../controllers/index.js";

const routes = [
  { method: "post", path: "/", controller: loginHandler },
  { method: "post", path: "/", controller: registerHandler },
  { method: "get", path: "/", controller: logoutHandler },
];

// const connect = function (req, res, nex) {};

routes.forEach((route) => {
  router[route.method](route.path, route.controller);
});

export default router;
