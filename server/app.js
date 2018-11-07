import express from 'express';
import bodyParser from 'body-parser';
import routes from './v1/routes';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to Send-IT',
  });
});

app.use('/api/v1', routes);

app.use('/api/v1', (req, res) => {
  res.status(404);
  res.json({
    message: 'Send-IT API v1',
  });
});

app.use('*', (req, res) => {
  res.status(404);
  res.json({
    status: 'Failed',
    message: 'Page Not Found',
  });
});

export default app;
