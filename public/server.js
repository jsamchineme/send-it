const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const passport = require('../server/v1/helpers/services/Passport');


const app = express();

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to Sendit Frontend'
  });
});

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));

const port = 3002;

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(port, () => {
  console.log(`Listening... on port: ${port}`);
});
