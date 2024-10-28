const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8081 });
const clients = new Map();

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);
    const { type, userId, targetId, content } = parsedMessage;

    if (type === 'register') {
      clients.set(userId, ws);
    } else if (type === 'private_message' && clients.has(targetId)) {
      const targetWs = clients.get(targetId);
      if (targetWs.readyState === WebSocket.OPEN) {
        targetWs.send(JSON.stringify({ from: userId, content }));
      }
    }
  });

  ws.on('close', () => {
    for (let [userId, clientWs] of clients.entries()) {
      if (clientWs === ws) {
        clients.delete(userId);
        break;
      }
    }
  });
});

console.log('WebSocket server is running on ws://localhost:8081');
