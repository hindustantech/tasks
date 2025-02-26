// server.mjs
import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.end('Hello World!\n');
});

// starts a simple http server locally on port 3000
server.listen(8080, '127.0.0.1', () => {
  console.log('Hello');
});

// run with `node server.mjs`
