//-------------------------------------
// Modules
//-------------------------------------
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from 'cors';

//-------------------------------------
// Controllers
//-------------------------------------
import { userRouter } from "./routers";

//-------------------------------------
// Functions
//-------------------------------------
const app = express();


//-------------------------------------
// Express configuration
//-------------------------------------
app.set("port", process.env.PORT || 3001);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: "keyboard cat"}));

// console.log(userRouter.url, 'userRouter.url');


//-------------------------------------
// Routes
//-------------------------------------

app.use(userRouter.url, userRouter);

export default app;
