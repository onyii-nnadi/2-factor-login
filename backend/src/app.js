// app setup (middleware, routes)
// Import files/libraries
import express from 'express'
import { config } from './config/config.js';
import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboard.js';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';

// start express app
const app = express();

// Set TRUST_PROXY=1 when running behind a load balancer or reverse proxy so rate limiting sees real client IPs.
if (process.env.TRUST_PROXY) app.set('trust proxy', Number(process.env.TRUST_PROXY));

// Security and CORS
app.use(helmet());
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json({ limit: '10kb' }));

// runs health checks without auth or rate limiting 
app.get('/health', (_req, res) => res.json({ status: 'ok' })); 

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

// Error handling middleware
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong. Try again.' });
});

// export app for use in other files (like index.js)
export default app;