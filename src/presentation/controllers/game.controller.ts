import { Request, Response } from 'express';
import { GameService } from '@/application/services/game.service';
import { GameApiService } from '@/infrastructure/http/game-api.service';

/**
 * Controller handling game-related HTTP requests
 */
export class GameController {
  private readonly gameApiService: GameApiService;

  constructor(private readonly gameService: GameService) {
    this.gameApiService = new GameApiService();
  }

  /**
   * Get all games with optional pagination
   */
  getAllGames = async (req: Request, res: Response): Promise<void> => {
    try {
      const { offset, limit } = req.query;
      const games = await this.gameService.getAllGames({
        offset: offset ? parseInt(offset as string, 10) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
      });
      res.json(games);
    } catch (error) {
      console.error('Error getting games:', error);
      res.status(500).json({ error: 'Failed to get games' });
    }
  };

  /**
   * Get a game by its ID
   */
  getGameById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const game = await this.gameService.getGameById(parseInt(id, 10));
      if (!game) {
        res.status(404).json({ error: 'Game not found' });
        return;
      }
      res.json(game);
    } catch (error) {
      console.error('Error getting game:', error);
      res.status(500).json({ error: 'Failed to get game' });
    }
  };

  /**
   * Search for games based on criteria
   */
  searchGames = async (req: Request, res: Response): Promise<void> => {
    try {
      const { query, platform, minPrice, maxPrice } = req.query;
      const games = await this.gameService.searchGames({
        query: query as string | undefined,
        platform: platform as string | undefined,
        minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
      });
      res.json(games);
    } catch (error) {
      console.error('Error searching games:', error);
      res.status(500).json({ error: 'Failed to search games' });
    }
  };

  /**
   * Populate the database with games from external sources
   */
  populateGames = async (_req: Request, res: Response): Promise<void> => {
    try {
      const { iosGames, androidGames } = await this.gameApiService.fetchGames();
      const games = await this.gameService.createGamesFromExternalData(iosGames, androidGames);
      res.json({ success: true, count: games.length });
    } catch (error) {
      console.error('Error populating games:', error);
      res.status(500).json({ error: 'Failed to populate database' });
    }
  };
}
