import http from 'http';
import app from './app';

// setting up the port to be used for creating a server
const port = parseInt(process.env.PORT, 10) || 8001;

// create the server
const server = http.createServer(app);

// open connection to listen to the port
// eslint-disable-next-line no-console
server.listen(port, () => { console.log(`Application is running on port ${port}`); });

export default app;
