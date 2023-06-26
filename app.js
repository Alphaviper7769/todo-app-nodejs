import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
    path:"./data/config.env",
});

// Using MiddleWare
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true,
    sameSite: "none",                                           // keval same site pe hi cookie jaegi
    secure: true,
}))

//Using Routers
app.use("/api/v1/users",userRouter);
app.use("/api/v1/task",taskRouter)

app.get("/", (req,res)=> {
    res.send("Nice Working");
})

//Using Error MiddleWare
app.use(errorMiddleware)