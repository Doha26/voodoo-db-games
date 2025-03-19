import { Model, Op, WhereOptions } from 'sequelize';
import { Game, GameCreateInput, GameUpdateInput, Platform } from '@/domain/entities/game.entity';
import { GameRepository } from '../database/repository';
import { GameModel } from '../database';
import { AppError } from '@/presentation/middlewares/error.middleware';

type WhereClause = WhereOptions & {
  [Op.or]?: Array<{ [key: string]: { [Op.like]: string } }>;
  platform?: Platform;
  price?: {
    [Op.gte]?: number;
    [Op.lte]?: number;
  };
};

/**
 * Sequelize implementation of the GameRepository interface
 */
export class SequelizeGameRepository implements GameRepository {
  /**
   * Find all games with optional pagination
   */
  async findAll(options?: { offset?: number; limit?: number }): Promise<Game[]> {
    const games = await GameModel.findAll({
      offset: options?.offset,
      limit: options?.limit,
    });
    return games.map((game: Model) => game.toJSON() as Game);
  }

  /**
   * Find a game by its ID
   */
  async findById(id: number): Promise<Game | null> {
    const game = await GameModel.findByPk(id);
    return game ? (game.toJSON() as Game) : null;
  }

  /**
   * Find games by search criteria
   */
  async search(criteria: {
    name?: string;
    platform?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<Game[]> {
    const where: WhereClause = {};

    // Add name filter if provided
    if (criteria.name) {
      where.name = {
        [Op.like]: `%${criteria.name}%`,
      };
    }

    // Add platform filter if provided
    if (criteria.platform) {
      where.platform = criteria.platform.toLowerCase() as Platform;
    }

    // Add price range if provided
    if (criteria.minPrice !== undefined || criteria.maxPrice !== undefined) {
      where.price = {};
      if (criteria.minPrice !== undefined) {
        where.price[Op.gte] = criteria.minPrice;
      }
      if (criteria.maxPrice !== undefined) {
        where.price[Op.lte] = criteria.maxPrice;
      }
    }

    const games = await GameModel.findAll({ where });
    return games.map((game: Model) => game.toJSON() as Game);
  }

  /**
   * Create a new game
   */
  async create(data: GameCreateInput): Promise<Game> {
    const game = await GameModel.create(data);
    return game.toJSON() as Game;
  }

  /**
   * Create multiple games
   */
  async createMany(games: GameCreateInput[]): Promise<Game[]> {
    const createdGames = await GameModel.bulkCreate(games);
    return createdGames.map((game: Model) => game.toJSON() as Game);
  }

  /**
   * Update a game by its ID
   */
  async update(id: number, data: GameUpdateInput): Promise<Game> {
    const game = await GameModel.findByPk(id);
    if (!game) {
      throw new AppError(404, `Game with id ${id} not found`);
    }

    await game.update(data);
    return game.toJSON() as Game;
  }

  /**
   * Delete a game by its ID
   */
  async delete(id: number): Promise<void> {
    const game = await GameModel.findByPk(id);
    if (!game) {
      throw new AppError(404, `Game with id ${id} not found`);
    }

    await game.destroy();
  }
}
