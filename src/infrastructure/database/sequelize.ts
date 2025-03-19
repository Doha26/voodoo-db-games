import { Sequelize } from 'sequelize';
import path from 'path';

/**
 * Sequelize instance for SQLite database
 */
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../../database.sqlite'),
  logging: false,
});
