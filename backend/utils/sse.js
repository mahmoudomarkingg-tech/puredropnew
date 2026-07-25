'use strict';

const adminEventClients = new Set();

function writeSseEvent(res, eventName, payload) {
  res.write(`event: ${eventName}\n`);
  res.write(`data: ${JSON.stringify(payload)}\n\n`);
}

function addAdminEventClient(req, res) {
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  writeSseEvent(res, 'connected', {
    success: true,
    message: 'تم الاتصال بالتحديثات الفورية',
    at: new Date().toISOString()
  });

  adminEventClients.add(res);
  req.on('close', () => adminEventClients.delete(res));
}

function broadcastAdminEvent(eventName, payload = {}) {
  const data = { ...payload, at: new Date().toISOString() };
  for (const client of adminEventClients) {
    try {
      writeSseEvent(client, eventName, data);
    } catch {
      adminEventClients.delete(client);
    }
  }
}

module.exports = {
  addAdminEventClient,
  broadcastAdminEvent
};
