import express from "express";
import router from "./routes/index.js";
import path from "node:path"
import { fileURLToPath } from 'url';
import { ErrorHandlerMiddleware } from "./middleware/error-handler.middleware.js";
import { BaseException } from "./exception/base.exception.js";
import { join } from "node:path"
import cookieParser from "cookie-parser";
import pageRouter from "./routes/page.route.js";

import morgan from "morgan";

import methodOverride from "method-override";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()


if(process.env.NODE_ENV. trim() === "development"){
    app.use(morgan("tiny"))
}

app.use(methodOverride("_method"))


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser("cookie-secret"))

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname, "public")));

app.use("/uploads", express.static(join(process.cwd(), "uploads")));

app.use("/",pageRouter)

app.use("/",router)
// app.all("/",(_,res)=>{
//     res.render("profile");
// })
app.all("/*",(req,res,next) => {
    res.render("404")
});

app.use(ErrorHandlerMiddleware);

export default app;