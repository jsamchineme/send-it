import http from 'http';
import app from './app';

const port = parseInt(process.env.PORT, 10) || 8001;
app.set('port', port);

const server = http.createServer(app);

// eslint-disable-next-line no-console
server.listen(port, () => { console.log(`Application is running on port ${port}`); });

export default app;
