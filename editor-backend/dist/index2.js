"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const wss = new ws_1.default.Server({ port: 3001 });
const rooms = {}; // Object to store rooms: { roomName: { clientId: socket } }
wss.on('connection', ws => {
    // Generate a unique client ID for this connection
    const clientId = generateUniqueId();
    ws.on('message', (message) => {
        // message is a Buffer (RawData), so convert to string
        let data;
        try {
            data = JSON.parse(message.toString());
        }
        catch (e) {
            console.error('Invalid JSON message received:', message);
            return;
        }
        if (data.type === 'joinRoom') {
            const roomName = data.room;
            if (!rooms[roomName]) {
                rooms[roomName] = {}; // Create room if it doesn't exist
            }
            rooms[roomName][clientId] = ws; // Add client to the room
            console.log(`${clientId} joined room: ${roomName}`);
        }
        else if (data.type === 'sendMessage') {
            const roomName = data.room;
            const messageText = data.text;
            if (rooms[roomName]) {
                // Send message to all clients in the specified room
                Object.values(rooms[roomName]).forEach((clientSocket) => {
                    if (clientSocket.readyState === ws_1.default.OPEN) {
                        clientSocket.send(JSON.stringify({ type: 'message', sender: clientId, text: messageText }));
                    }
                });
            }
        }
    });
    ws.on('close', () => {
        // Remove client from all rooms they might be in
        Object.keys(rooms).forEach(roomName => {
            if (rooms[roomName][clientId]) {
                delete rooms[roomName][clientId];
                if (Object.keys(rooms[roomName]).length === 0) {
                    delete rooms[roomName]; // Delete room if empty
                }
            }
        });
        console.log(`${clientId} disconnected.`);
    });
});
function generateUniqueId() {
    // Simple ID generation (for demonstration)
    return Math.random().toString(36).substring(2, 9);
}
