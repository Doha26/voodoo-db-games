import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { z } from 'zod';

export const GameSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  platform: z.enum(['ios', 'android']),
  appId: z.number(),
  publisherName: z.string(),
  publisherId: z.number(),
  iconUrl: z.string(),
  url: z.string(),
  categories: z.array(z.number()),
  validCountries: z.array(z.string()),
  publisherProfileUrl: z.string(),
  releaseDate: z.string(),
  updatedDate: z.string(),
  inAppPurchases: z.boolean(),
  showsAds: z.boolean().nullable(),
  buysAds: z.boolean(),
  rating: z.number(),
  price: z.number(),
  globalRatingCount: z.number(),
  ratingCount: z.number(),
  ratingCountForCurrentVersion: z.number(),
  ratingForCurrentVersion: z.number(),
  version: z.string(),
  bundleId: z.string(),
  rank: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Game = z.infer<typeof GameSchema>;

export class GameModel extends Model<Game> implements Game {
  public id!: number;
  public name!: string;
  public platform!: 'ios' | 'android';
  public appId!: number;
  public publisherName!: string;
  public publisherId!: number;
  public iconUrl!: string;
  public url!: string;
  public categories!: number[];
  public validCountries!: string[];
  public publisherProfileUrl!: string;
  public releaseDate!: string;
  public updatedDate!: string;
  public inAppPurchases!: boolean;
  public showsAds!: boolean | null;
  public buysAds!: boolean;
  public rating!: number;
  public price!: number;
  public globalRatingCount!: number;
  public ratingCount!: number;
  public ratingCountForCurrentVersion!: number;
  public ratingForCurrentVersion!: number;
  public version!: string;
  public bundleId!: string;
  public rank!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

GameModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    platform: {
      type: DataTypes.ENUM('ios', 'android'),
      allowNull: false,
    },
    appId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    publisherName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publisherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    iconUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categories: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    validCountries: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    publisherProfileUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    releaseDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updatedDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inAppPurchases: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    showsAds: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    buysAds: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    globalRatingCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ratingCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ratingCountForCurrentVersion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ratingForCurrentVersion: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    version: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bundleId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rank: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Game',
    tableName: 'games',
  }
);
