const http = require('http');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === 'GET') {
    if (url === '/html') {
      // Serve HTML content
      const htmlContent = fs.readFileSync(path.join(__dirname, './public/coder.html'), 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(htmlContent);
    } else if (url === '/json') {
      // Serve JSON content
      const jsonContent = require('./public/coder.json');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(jsonContent, null, 2));
    } else if (url === '/uuid') {
      // Generate and serve a UUID
      const randomUUID = uuidv4();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ uuid: randomUUID }));
    } else if (url.startsWith('/status/')) {
      // Serve a response with the specified status code
      const statusCode = parseInt(url.split('/').pop());
      res.writeHead(statusCode, { 'Content-Type': 'text/plain' });
      res.end(`Response with status code ${statusCode}`);
    } else if (url.startsWith('/delay/')) {
      // Delay response for the specified seconds
      const delay = parseInt(url.split('/').pop()) * 1000;
      setTimeout(() => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Response with a ${delay / 1000} second delay`);
      }, delay);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
