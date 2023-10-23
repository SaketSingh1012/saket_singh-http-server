// app.js
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

app.get('/html', (req, res) => {
  const htmlContent = fs.readFileSync(path.join(__dirname, './public/coder.html'), 'utf8');
  res.status(200).type('text/html').send(htmlContent);
});

app.get('/json', (req, res) => {
  const jsonContent = require('./public/coder.json');
  res.status(200).json(jsonContent);
});

app.get('/uuid', (req, res) => {
  const randomUUID = uuidv4();
  res.status(200).json({ uuid: randomUUID });
});

app.get('/status/:statusCode', (req, res) => {
  const statusCode = parseInt(req.params.statusCode);
  res.status(statusCode).send(`Response with status code ${statusCode}`);
});

app.get('/delay/:delayInSeconds', (req, res) => {
  const delay = parseInt(req.params.delayInSeconds) * 1000;
  setTimeout(() => {
    res.status(200).send(`Response with a ${delay / 1000} second delay`);
  }, delay);
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});