export enum Platform {
  IOS = 'ios',
  ANDROID = 'android',
}

/**
 * Represents a game in the system
 */
export interface Game {
  id?: number;
  appId: number;
  name: string;
  platform: Platform;
  publisherName: string;
  price: number;
  genres: string[];
  categories: string[];
  rating: number;
  ratingCount: number;
  description: string;
  size: number;
  updatedDate: Date;
  releaseDate: Date;
  version: string;
  url: string;
  iconUrl: string;
}

/**
 * Represents the minimum required fields to create a new game
 */
export type GameCreateInput = Omit<Game, 'id'>;

/**
 * Represents the fields that can be updated for a game
 */
export type GameUpdateInput = Partial<GameCreateInput>;
