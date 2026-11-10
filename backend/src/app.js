// app setup (middleware, routes)
// Import files/libraries
import express from 'express'
import { config } from './config/config.js';
import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboard.js';
import rateLimit from 'express-rate-limit';

// start express app
const app = express();

// Set rate limiting to all api routes
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

// Dashboard routes
app.use('/api/dashboard', dashboardRoutes);


// export app for use in other files (like index.js)
export default app;