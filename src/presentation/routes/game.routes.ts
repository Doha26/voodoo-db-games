import { Router } from 'express';
import { GameController } from '../controllers/game.controller';
import { GameService } from '@/application/services/game.service';
import { SequelizeGameRepository } from '@/infrastructure/repositories/sequelize-game.repository';

const router = Router();

// Create dependencies
const gameRepository = new SequelizeGameRepository();
const gameService = new GameService(gameRepository);
const gameController = new GameController(gameService);

// Routes
router.get('/', gameController.getAllGames);
router.get('/search', gameController.searchGames);
router.get('/:id', gameController.getGameById);
router.post('/populate', gameController.populateGames);

export const gameRoutes = router;
