# Voodoo Game Database API

A RESTful API service for managing game data, built with Express, TypeScript, and SQLite.

## Features

- CRUD operations for game data
- Search functionality by name and platform
- Database population with top 100 apps from App Store and Google Play Store

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd voodoo-game-database
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Start the production server:
   ```bash
   npm start
   ```

The API will be available at `http://localhost:3000`

## API Endpoints

### Games

- `GET /api/games` - Get all games
- `GET /api/games/:id` - Get a specific game
- `POST /api/games/search` - Search games by name and platform
- `POST /api/games/populate` - Populate database with top 100 apps

## Development

- Run linting: `npm run lint`
- Format code: `npm run format`
- Run tests: `npm test`

## Database

The application uses SQLite as its database. The database file will be created automatically when the application starts. 