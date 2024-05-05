const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  console.log('React connected');
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT,
  console.log(`Server at port ${PORT}`)
);