import { Game, GameCreateInput, GameUpdateInput, Platform } from '@/domain/entities/game.entity';
import { GameRepository } from '@/infrastructure/database/repository';
import { ExternalGameDto } from '@/infrastructure/http/types';

/**
 * Service handling game-related business logic
 */
export class GameService {
  constructor(private readonly gameRepository: GameRepository) {}

  /**
   * Get all games with optional pagination
   */
  async getAllGames(options?: { offset?: number; limit?: number }): Promise<Game[]> {
    return this.gameRepository.findAll(options);
  }

  /**
   * Create a new game
   */
  async createGame(data: GameCreateInput): Promise<Game> {
    return this.gameRepository.create(data);
  }

  /**
   * Get a game by its ID
   */
  async getGameById(id: number): Promise<Game | null> {
    return this.gameRepository.findById(id);
  }

  /**
   * Search for games based on criteria
   */
  async searchGames(criteria: {
    name?: string;
    platform?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<Game[]> {
    return this.gameRepository.search(criteria);
  }

  /**
   * Create multiple games from external data
   */
  async createGamesFromExternalData(
    iosGames: ExternalGameDto[],
    androidGames: ExternalGameDto[]
  ): Promise<Game[]> {
    const mappedGames: GameCreateInput[] = [
      ...this.mapExternalGames(iosGames, Platform.IOS),
      ...this.mapExternalGames(androidGames, Platform.ANDROID),
    ];

    return this.gameRepository.createMany(mappedGames);
  }

  /**
   * Update a game
   */
  async updateGame(id: number, data: GameUpdateInput): Promise<Game> {
    return this.gameRepository.update(id, data);
  }

  /**
   * Delete a game
   */
  async deleteGame(id: number): Promise<void> {
    return this.gameRepository.delete(id);
  }

  /**
   * Map external game data to our domain model
   */
  private mapExternalGames(games: ExternalGameDto[], platform: Platform): GameCreateInput[] {
    const now = new Date();

    return games
      .filter((game) => game && game.name)
      .map((game) => ({
        appId: game.appId || game.id || 0,
        name: game.name,
        platform,
        publisherName: game.publisher || game.developer || 'Unknown',
        price: game.price || 0,
        genres: Array.isArray(game.genres) ? game.genres : [],
        categories: Array.isArray(game.categories) ? game.categories : [],
        rating: game.rating || 0,
        ratingCount: game.ratingCount || 0,
        description: game.description || '',
        size: game.size || 0,
        updatedDate: now,
        releaseDate: game.releaseDate ? new Date(game.releaseDate) : now,
        version: game.version || '1.0',
        url: game.url || '',
        iconUrl: game.iconUrl || '',
      }));
  }
}
