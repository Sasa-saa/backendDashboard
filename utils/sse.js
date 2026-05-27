// utils/sse.js
const clients = [];

function addClient(res) {
  clients.push(res);
}

function removeClient(res) {
  const idx = clients.indexOf(res);
  if (idx !== -1) clients.splice(idx, 1);
}

function broadcastUpdate(payload) {
  clients.forEach((client) => {
    client.write(`data: ${JSON.stringify(payload)}\n\n`);
  });
}

module.exports = { clients, addClient, removeClient, broadcastUpdate };
