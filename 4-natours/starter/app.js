const express = require('express');

const app = express();

const port = 3000;

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Hello  from the server side! ', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.status(201).json({ message: 'You can post this endpoint ' });
});

app.listen(port, () => {
  console.log(`App Running on port ${port}...`);
});
