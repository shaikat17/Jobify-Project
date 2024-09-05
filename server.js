import express from "express";
import dotenv from 'dotenv'

const app = express();

dotenv.config()


// middleware
import notFoundMiddleware from "./middleware/notFound.js";
import errorHandlerMiddleware from "./middleware/errorHandler.js";
import connectDB from "./db/connect.js";

app.get("/", (req, res) => {
  res.send("Hello World");
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