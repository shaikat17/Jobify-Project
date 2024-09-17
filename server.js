import 'express-async-errors'
import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan';
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import helmet from 'helmet';
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'


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
import authenticateUser from './middleware/auth.js'

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}

const __dirname = dirname(fileURLToPath(import.meta.url))

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/dist')));

app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

// only when ready to deploy
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
  });

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