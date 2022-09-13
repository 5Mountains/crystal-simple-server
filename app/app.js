import { log } from "high-level";
import express from "express";
import cors from "cors";
import createError from "http-errors";

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

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  next(createError(404));
});

export default app;
