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
import { accountRouter, authorizeRouter } from "./routers";

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
app.use(session({
    // name: 'user',
    secret: 'pa$$w0rd',
    resave: false, // disable session resave
    rolling: true, // reset max age on every use
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 15 * 60 * 1000, // 15m
    },
}));


//-------------------------------------
// Routes
//-------------------------------------

app.use(accountRouter.url, accountRouter);
app.use(authorizeRouter.url, authorizeRouter);

export default app;
