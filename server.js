const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle student and admin signaling
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Handle student signal
    socket.on('student-signal', (data) => {
        console.log('Received student signal:', data);
        // Broadcast signal to all admin clients
        socket.broadcast.emit('student-signal', data);
    });

    // Handle admin signal
    socket.on('admin-signal', (data) => {
        console.log('Received admin signal:', data);
        // Broadcast signal to all student clients
        socket.broadcast.emit('admin-signal', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
