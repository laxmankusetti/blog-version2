import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from 'path'

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import postRouter from './routes/post.routes.js';
import commentRouter from './routes/comment.routes.js';

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("App is conected with MONGODB");
  })
  .catch((error) => {
    console.log(error.message);
  });

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/post', postRouter)
app.use('/api/comment', commentRouter)

app.listen(3000, () => {
  console.log("Server is running on the port no : 3000");
});

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal server error';

    res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })
})
