import express from 'express';
import cors from 'cors';
import path from 'path';
import { sequelize } from './infrastructure/database';
import { gameRoutes } from './presentation/routes/game.routes';
import { errorHandler } from './presentation/middlewares/error.middleware';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api/games', gameRoutes);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Error handling
app.use(errorHandler);

// Initialize database and start server
const startServer = async (): Promise<void> => {
  try {
    // Force sync to recreate tables with new schema
    await sequelize.sync({ force: true });
    console.log('Database synchronized successfully');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
