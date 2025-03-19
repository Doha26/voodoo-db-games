import { Router } from 'express';
import { GameController } from '@presentation/controllers/game.controller';
import { GameService } from '@application/services/game.service';
import { SequelizeGameRepository } from '@infrastructure/repositories/sequelize-game.repository';
import { Request, Response } from 'express';
import { WhereOptions } from 'sequelize';

const router = Router();

// Create dependencies
const gameRepository = new SequelizeGameRepository();
const gameService = new GameService(gameRepository);
const gameController = new GameController(gameService);

// Routes
router.get('/', gameController.getAllGames);
router.get('/search', async (req: Request, res: Response) => {
  try {
    const { name, platform } = req.query;
    const searchParams: WhereOptions = {};

    // Add name filter if provided
    if (name && typeof name === 'string') {
      searchParams.name = name;
    }

    // Add platform filter if provided
    if (platform && typeof platform === 'string') {
      searchParams.platform = platform.toLowerCase();
    }

    // If no search parameters provided, return all games
    if (Object.keys(searchParams).length === 0) {
      const games = await gameService.getAllGames();
      res.json(games);
      return;
    }

    const games = await gameService.searchGames(searchParams);
    res.json(games);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to search games' });
  }
});
router.get('/:id', gameController.getGameById);
router.post('/populate', gameController.populateGames);
router.post('/', gameController.createGame);
router.put('/:id', gameController.updateGame);
router.delete('/:id', gameController.deleteGame);

export const gameRoutes = router;
