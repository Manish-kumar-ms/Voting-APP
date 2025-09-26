
export const setupSocketConnection = (io) => {
  io.on("connection", (socket) => {
    console.log(" A client connected:", socket.id);

    socket.on("disconnect", () => {
      console.log(" Client disconnected:", socket.id);
    });
  });
};

// 👇 Helper to emit from anywhere
export const emitSocketEvent = (eventName, data) => {
  if (global.io) {
    global.io.emit(eventName, data);
  }
};