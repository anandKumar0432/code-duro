

import WebSocket from "ws";
const wss = new WebSocket.Server({ port: 3001 });

type Rooms = {
    [roomName: string]: {
        [clientId: string]: WebSocket;
    };
};
const rooms: Rooms = {};

wss.on('connection', ws => {
    const clientId = generateUniqueId(); 

    ws.on('message', (message) => {
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
                rooms[roomName] = {};
            }
            rooms[roomName][clientId] = ws;
            console.log(`${clientId} joined room: ${roomName}`);
        } else if (data.type === 'sendMessage') {
            const roomName: string = data.room;
            const messageText: string = data.text;
            if (rooms[roomName]) {
                Object.values(rooms[roomName]).forEach((clientSocket: WebSocket) => {
                    if (clientSocket.readyState === WebSocket.OPEN) {
                        clientSocket.send(JSON.stringify({ type: 'message', sender: clientId, text: messageText }));
                    }
                });
            }
        }
    });

    ws.on('close', () => {
        Object.keys(rooms).forEach(roomName => {
            if (rooms[roomName][clientId]) {
                delete rooms[roomName][clientId];
                if (Object.keys(rooms[roomName]).length === 0) {
                    delete rooms[roomName];
                }
            }
        });
        console.log(`${clientId} disconnected.`);
    });
});

function generateUniqueId() {
    return Math.random().toString(36).substring(2, 9);
}