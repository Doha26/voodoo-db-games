import { DataTypes, Model } from 'sequelize';
import { Game } from '@/domain/entities/game.entity';
import { Platform } from '@/domain/entities/types/platform';
import { sequelize } from './sequelize';

export class GameModel extends Model<Game> implements Game {
  public id!: number;
  public appId!: number;
  public name!: string;
  public platform!: Platform;
  public publisherName!: string;
  public price!: number;
  public genres!: string[];
  public categories!: string[];
  public rating!: number;
  public ratingCount!: number;
  public description!: string;
  public size!: number;
  public updatedDate!: Date;
  public releaseDate!: Date;
  public version!: string;
  public url!: string;
  public iconUrl!: string;
}

GameModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    appId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    platform: {
      type: DataTypes.ENUM(Platform.IOS, Platform.ANDROID),
      allowNull: false,
    },
    publisherName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    genres: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    categories: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    ratingCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
    },
    size: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    updatedDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    version: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '1.0',
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    iconUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
  },
  {
    sequelize,
    tableName: 'games',
    timestamps: false,
  }
);
