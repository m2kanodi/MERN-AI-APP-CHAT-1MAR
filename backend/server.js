import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
const app = express();
const PORT = process.env.PORT || 5001;
app.use(bodyParser.json()); // Add this line to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }))
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes);

 //to parse the incoming requests from users
app.get("/",(req,res) =>{
    res.send("hello world")
})

app.listen(PORT , () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`)
});