const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;
const app = express();

app.use('/', express.static('public'))

// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

// app.use(express.static('public'))

app.listen(port, () => { console.log(`App listening on port ${port}`)});