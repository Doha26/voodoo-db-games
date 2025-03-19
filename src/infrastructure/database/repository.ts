import { Game, GameCreateInput, GameUpdateInput } from '@/domain/entities/game.entity';

export interface GameRepository {
  findAll(options?: { offset?: number; limit?: number }): Promise<Game[]>;
  findById(id: number): Promise<Game | null>;
  search(criteria: {
    query?: string;
    platform?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<Game[]>;
  createMany(games: GameCreateInput[]): Promise<Game[]>;
  update(id: number, data: GameUpdateInput): Promise<Game>;
  delete(id: number): Promise<void>;
}
