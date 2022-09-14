import { Router } from "express";

const router = Router();

import {
  loginHandler,
  registerHandler,
  logoutHandler,
} from "../controllers/index.js";

const routes = [
  { method: "post", path: "/login", controller: loginHandler },
  { method: "post", path: "/register", controller: registerHandler },
  { method: "get", path: "/logout", controller: logoutHandler },
];

// const connect = function (req, res, nex) {};

routes.forEach((route) => {
  router[route.method](route.path, route.controller);
});

export default router;
