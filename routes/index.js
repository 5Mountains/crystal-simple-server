import { Router } from "express";

const router = Router();

import loginHandler from "../controllers/index.js";
import registerHandler from "../controllers/index.js";
import logoutHandler from "../controllers/index.js";

const routes = [
  { method: "post", path: "/", func: loginHandler },
  { method: "post", path: "/", func: registerHandler },
  { method: "get", path: "/", func: logoutHandler },
];

const connect = function (req, res, nex) {};

routes.forEach((route) =>
  router[route.method](route.path, connect.bind(route.func))
);

export default router;
