

import WebSocket from "ws";
const wss = new WebSocket.Server({ port: 3001 });

// Define the type for rooms
type Rooms = {
    [roomName: string]: {
        [clientId: string]: WebSocket;
    };
};
const rooms: Rooms = {}; // Object to store rooms: { roomName: { clientId: socket } }

wss.on('connection', ws => {
    // Generate a unique client ID for this connection
    const clientId = generateUniqueId(); 

    ws.on('message', (message) => {
        // message is a Buffer (RawData), so convert to string
        let data: any;
        try {
            data = JSON.parse(message.toString());
        } catch (e) {
            console.error('Invalid JSON message received:', message);
            return;
        }

        if (data.type === 'joinRoom') {
            const roomName: string = data.room;
            if (!rooms[roomName]) {
                rooms[roomName] = {}; // Create room if it doesn't exist
            }
            rooms[roomName][clientId] = ws; // Add client to the room
            console.log(`${clientId} joined room: ${roomName}`);
        } else if (data.type === 'sendMessage') {
            const roomName: string = data.room;
            const messageText: string = data.text;
            if (rooms[roomName]) {
                // Send message to all clients in the specified room
                Object.values(rooms[roomName]).forEach((clientSocket: WebSocket) => {
                    if (clientSocket.readyState === WebSocket.OPEN) {
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