import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// Import routes
import managementRoutes from './routes/management';
import farmersRoutes from './routes/farmers';
import newsRoutes from './routes/news';
import statsRoutes from './routes/stats';
import reportsRoutes from './routes/reports';
import authRoutes from './routes/auth';
import startupsRoutes from './routes/startups';
import mentorsRoutes from './routes/mentors';
import investorsRoutes from './routes/investors';
import pppRoutes from './routes/ppp';
import investmentRoutes from './routes/investment';
import exportRoutes from './routes/export';

const app = express();

// ============= Middleware =============
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static asset caching middleware
app.use((req, res, next) => {
  // Cache static assets (images, videos, fonts) for 1 year
  if (req.path.match(/\.(jpg|jpeg|png|gif|webp|svg|ico|mp4|webm|woff|woff2|ttf|eot)$/i)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  }
  next();
});

// Request logging in development
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
    next();
  });
}

// ============= Health Check =============
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// ============= API Routes =============
app.use('/api/management', managementRoutes);
app.use('/api/farmers', farmersRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/startups', startupsRoutes);
app.use('/api/mentors', mentorsRoutes);
app.use('/api/investors', investorsRoutes);
app.use('/api/ppp', pppRoutes);
app.use('/api/investment', investmentRoutes);
app.use('/api/export', exportRoutes);

// ============= 404 Handler =============
app.use('/api/*path', (req, res) => {
  res.status(404).json({ error: 'Not Found', path: req.path });
});

// ============= Error Handler =============
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV !== 'production' ? err.message : undefined
  });
});

export default app;
