
import cookieParser from 'cookie-parser';
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './Config/db.js';
import AuthRouter from './Routes/AuthRouter.js';
import VoteRouter from './Routes/VoteRouter.js';
import { Server } from 'socket.io';
import { setupSocketConnection } from './socket.js'
import http from 'http';

const app=express()
dotenv.config();

const PORT = process.env.PORT || 8080

//  Setup HTTP server and wrap Express with it
const server = http.createServer(app);

//  Setup Socket.IO server
const io = new Server(server, {
  cors: {
    origin: 'https://voting-app-frontend-iaiz.onrender.com',
    credentials: true,
  },
});

//  Global access to io
global.io = io;

//  Setup socket connection handling
setupSocketConnection(io);

app.use(express.json())
app.use(cookieParser())
app.use(cors(
    { origin: "https://voting-app-frontend-iaiz.onrender.com" ,
      credentials: true, 
    }
));

app.get('/',(req,res)=>{
    res.send('Welcome to the APP')
})

app.use('/api/auth', AuthRouter)
app.use('/api/vote',VoteRouter)


server.listen(PORT,()=>{
    connectDB()
    console.log(`Server is running on port ${PORT}`)
})
