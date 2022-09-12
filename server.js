import "dotenv/config";

import http from "http";
import app from "./app/app.js";

const server = http.createServer(app);

const port = process.env.PORT || 3500;

server.listen(port);
