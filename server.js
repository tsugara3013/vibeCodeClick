// server.js
const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const FILE_PATH = './clickdata.json';

app.use(cors());
app.use(express.json());

// Ensure file exists with default count
if (!fs.existsSync(FILE_PATH)) {
  fs.writeFileSync(FILE_PATH, JSON.stringify({ count: 0 }, null, 2));
}

// GET current count
app.get('/count', (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE_PATH));
  res.json({ count: data.count });
});

// POST to increment count
app.post('/click', (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE_PATH));
  data.count += 1;
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
  res.json({ count: data.count });
});

app.listen(PORT, () => {
  console.log(`Clicker server live on port ${PORT}`);
});
