import express, { json } from "express";
import cors from "cors";
import connectDB from "./api/config/db.js";
import notesRouter from "./api/routes/notesRoutes.js";
import { config } from "dotenv";
import userRouter from "./api/routes/userRoutes.js";
import { errorHandler, notFound } from "./api/Middleware/errorMiddleware.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
config();
connectDB();
app.use(json());

app.use(
  cors({
    origin: ["https://notezipperf.onrender.com"],
    credentials: true,
  })
);




const port = process.env.PORT || 4045
////// deployment code 
////----------GE---------///
app.get("/",(req,res)=>{
    res.send('server is running');
})

////----------GE---------///
app.use("/api/users", userRouter);
app.use("/api/notes", notesRouter);
app.use('/uploads', express.static('uploads'));
app.use(errorHandler);
app.listen(port, () => console.log("server is running at 3035 and watching"));



