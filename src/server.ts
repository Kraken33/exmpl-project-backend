require("dotenv").config();
import http from "http";
import errorHandler from "errorhandler";

import app from "./app";
import { dbConnect } from "./configs";
import { createTerminus } from "./configs";

app.use(errorHandler());

//-------------------------------------
// App entry point
//-------------------------------------

const createServer = () => {
  return http.createServer(app);
};

const startServer = (server: any) => {
  server.listen(app.get("port"), () => {
    console.log(
      "  App is running at http://localhost:%d in %s mode",
      app.get("port"),
      app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
  });
};

dbConnect.then(createServer).then(createTerminus).then(startServer);
