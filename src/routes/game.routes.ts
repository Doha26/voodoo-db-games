import { Router, Request, Response } from 'express';
import { GameModel } from '../models/game.model';

const router = Router();

// Get all games
router.get('/', async (_req: Request, res: Response) => {
  console.log('Received request to fetch all games');
  try {
    console.log('Querying database for all games...');
    const games = await GameModel.findAll();
    console.log(`Found ${games.length} games`);
    res.json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

export const gameRoutes = router;
