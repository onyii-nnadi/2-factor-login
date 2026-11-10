import app from './app.js';
import { config } from './config/config.js';

const server = app.listen(config.port, () => console.log(`API listening on :${config.port}`));
process.on('SIGTERM', () => server.close(() => process.exit(0)));