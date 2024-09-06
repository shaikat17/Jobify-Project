import 'express-async-errors'
import express from "express";
import dotenv from 'dotenv'

const app = express();

dotenv.config()

// db
import connectDB from "./db/connect.js";

// routers
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRouter.js";

// middleware
import notFoundMiddleware from "./middleware/notFound.js";
import errorHandlerMiddleware from "./middleware/errorHandler.js";


app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobsRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT;

const start = async () => {
    try {
        await connectDB(process.env.DB_URL)
        app.listen(port, () => console.log(`Server is listening on port ${port}`));
    } catch (error) {
        console.log("🚀 ~ start ~ error:", error)
        
    }
}

start()