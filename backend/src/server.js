const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',        
        methods: ['GET', 'POST'],
        credentials: true,                      
        allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
    }
});


const userSockets = {}; 

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('registerUser', (userId) => {
        userSockets[userId] = socket.id;
    });

    socket.on('disconnect', () => {
        for (let userId in userSockets) {
            if (userSockets[userId] === socket.id) {
                delete userSockets[userId];
                break;
            }
        }
    });
});

app.set('io', io);
console.log('Socket.io instance set on app'); 
app.set('userSockets', userSockets);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));