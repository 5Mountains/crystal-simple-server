import "dotenv/config";

import http from "http";
import app from "./app/app.js";

const PORT = process.env.PORT || 3500;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running successfully on http://localhost:${PORT}`);
});
