import app from './app';
import { pool } from './lib/prisma';
import 'dotenv/config';

const PORT = process.env.API_PORT || 3001;

// ============= Start Server =============
const server = app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║   🚀 Jigawa Grow Herd API Server                        ║
║                                                          ║
║   Running on: http://localhost:${PORT}                      ║
║   Environment: ${(process.env.NODE_ENV || 'development').padEnd(13)}                    ║
║                                                          ║
║   Endpoints:                                             ║
║   • GET  /api/health      - Health check                 ║
║   • CRUD /api/management  - Management members           ║
║   • CRUD /api/farmers     - Farmers                      ║
║   • CRUD /api/farm-estates- Farm Estates                 ║
║   • CRUD /api/news        - News articles                ║
║   • CRUD /api/innovation-hubs- Innovation Hubs           ║
║   • GET  /api/stats       - Dashboard statistics         ║
║   • CRUD /api/reports     - Reports                      ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
`);
});

// ============= Graceful Shutdown =============
const gracefulShutdown = async (signal: string) => {
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

export default app;
