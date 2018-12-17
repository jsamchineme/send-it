import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import routes from './v1/routes';
import swaggerDocument from './swagger';

const app = express();

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Setup CORS to allow requests from all origins
app.use(cors());

// server root route
app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to Send-IT',
  });
});

// load the api/v1 home route
app.get('/api/v1', (req, res) => {
  res.status(404);
  res.json({
    message: 'Send-IT API v1',
    documentation: `${req.protocol}://${req.headers.host}/docs`,
  });
});

// load all api v1 routes
app.use('/api/v1', routes);

// load assets from public folder
// This is just for the swagger-ui.js file
app.use('/public', express.static('public'));

// provide custom javascript for the swagger
// This will be used to customise swagger ui
const swaggerOptions = {
  customJs: '/public/swagger-ui.js',
  customCss: '.swagger-ui img { content:url("/public/img/logo-with-text.png"); }'
};

// apply the route for the swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));


app.use('*', (req, res) => {
  res.status(404);
  res.json({
    message: 'Route Not Found',
  });
});

export default app;
