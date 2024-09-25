// Node.js Server - 2025-02-14T15:37:18.635Z
import http from 'http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from Node.js Server');
});

server.listen(3000, () => console.log('Server running on port 3000'));