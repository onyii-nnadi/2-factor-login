// app setup (middleware, routes)
// Import files/libraries
import express from 'express';
import cors from 'cors';
import { config } from './config/config.js';
import helmet from 'helmet';
import authRoutes from './routes/auth.js';

// start express app
const app = express();

//Add middleware to the application's request-processing pipeline. 
app.use(helmet());
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json({ limit: '10kb' }));  // The express.json() middleware is used to parse incoming requests with JSON payloads and is based on body-parser.
app.use(
  '/api/auth',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many attempts. Try again in a few minutes.' },
  }),
  authRoutes
);


app.get('/login', (req, res) => res.json({ status: 'ok' }));

export default app;