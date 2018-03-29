const path = require('path');
const express = require('express');

const app = express();
const publicPath = path.resolve(__dirname, '..', 'public');
const port = 3000;

app.use(express.static(publicPath));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log('Server is up!');
});
