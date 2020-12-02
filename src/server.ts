import errorHandler from "errorhandler";

import app from "./app";
import { dbConnect } from './db';

app.use(errorHandler());

//-------------------------------------
// App entry point
//-------------------------------------

const startServer = ()=>{
    app.listen(app.get("port"), () => {
        console.log(
            "  App is running at http://localhost:%d in %s mode",
            app.get("port"),
            app.get("env")
        );
        console.log("  Press CTRL-C to stop\n");
    });
}

dbConnect
.then(startServer);
