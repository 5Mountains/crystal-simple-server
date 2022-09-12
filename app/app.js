import { log } from "high-level";
import express from "express";
// import router from "../routes/index.js";

// pathes
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const serverEntryPoint = () => {
  let path = __dirname.split("/");
  path.pop();
  path = path.join("/");
  return path;
};

const app = express();

export default app;
