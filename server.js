// Local development server
// This file is only used during development and is ignored by Vercel
import app from './server/app';
import { pool } from './server/lib/prisma';

const PORT = process.env.API_PORT || 3001;

// Start the Express server
const server = app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║   🚀 Jigawa Grow Herd - Local Development Server        ║
║                                                          ║
║   Running on: http://localhost:${PORT}                      ║
║   Environment: ${(process.env.NODE_ENV || 'development').padEnd(13)}                    ║
║                                                          ║
║   Endpoints:                                             ║
║   • GET  /api/health      - Health check                 ║
║   • CRUD /api/management  - Management members           ║
║   • CRUD /api/farmers     - Farmers                      ║
║   • CRUD /api/news        - News articles                ║
║   • CRUD /api/innovation-hubs- Innovation Hubs           ║
║   • GET  /api/stats       - Dashboard statistics         ║
║   • CRUD /api/reports     - Reports                      ║
║   • POST /api/auth        - Authentication               ║
║                                                          ║
║   Note: This server is ONLY for local development       ║
║   Vercel will use serverless functions in production    ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
`);
});

// Graceful shutdown
const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  
  server.close(async () => {
    console.log('HTTP server closed.');
    
    try {
      await pool.end();
      console.log('Database pool closed.');
      process.exit(0);
    } catch (err) {
      console.error('Error during shutdown:', err);
      process.exit(1);
    }
  });
  
  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error('Forced shutdown after timeout.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
