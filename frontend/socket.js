
import { useContext } from "react";
import { io } from "socket.io-client";

const socket = io("https://voting-app-backend-az4s.onrender.com", {
  withCredentials: true,
});

export default socket; 
