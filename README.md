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

## Production Readiness Action Plan

### 1. Security Enhancements

- Implement proper authentication and authorization (JWT, OAuth2)
- Add rate limiting to prevent API abuse
- Set up CORS configuration for production domains
- Implement request validation middleware
- Add API key authentication for external services
- Set up proper secrets management (environment variables, AWS Secrets Manager)

### 2. Monitoring and Logging

- Implement structured logging (Winston/Pino)
- Set up application monitoring (New Relic/Datadog)
- Add health check endpoints
- Implement metrics collection (Prometheus)
- Set up error tracking (Sentry)
- Add performance monitoring

### 3. Testing

- Add unit tests for all services and controllers
- Implement integration tests for API endpoints
- Set up end-to-end testing
- Add load testing scripts
- Implement test coverage reporting
- Set up continuous integration pipeline

### 4. Database

- Implement database migrations
- Add database backup strategy
- Set up database connection pooling
- Implement database retry mechanisms
- Add database monitoring
- Consider read replicas for scaling

### 5. Deployment

- Set up containerization (Docker)
- Implement CI/CD pipeline
- Add deployment automation scripts
- Set up staging environment
- Implement blue-green deployment
- Add rollback procedures

### 6. Performance Optimization

- Implement caching layer (Redis)
- Add request compression
- Optimize database queries
- Implement pagination for all endpoints
- Add response compression
- Set up CDN for static assets

### 7. Documentation

- Add API documentation (Swagger/OpenAPI)
- Create deployment documentation
- Add monitoring documentation
- Create troubleshooting guide
- Document backup and recovery procedures
- Add architecture diagrams

## Automated Data Ingestion Solution

### Current Architecture

```
[Data Team] -> [S3 Bucket] -> [Populate API] -> [Database]
```

### Proposed Architecture

```
[Data Team] -> [S3 Bucket] -> [Event Bridge] -> [Lambda] -> [API] -> [Database]
```

### Implementation Details

1. **Event Detection**

   - Use AWS EventBridge to monitor S3 bucket for new file uploads
   - Configure event pattern to match new file creation events
   - Set up event filtering based on file patterns

2. **Lambda Function**

   - Create a Lambda function to handle S3 events
   - Implement file validation and processing
   - Add error handling and retry mechanisms
   - Set up dead letter queue for failed processing

3. **API Integration**

   - Modify the populate endpoint to accept direct file data
   - Add authentication for Lambda function
   - Implement rate limiting for automated requests
   - Add request validation

4. **Monitoring and Alerting**
   - Set up CloudWatch alarms for Lambda execution
   - Monitor API performance
   - Track processing success/failure rates
   - Set up error notifications

### Code Changes Required

1. **API Endpoint Modification**

```typescript
router.post('/populate', async (req: Request, res: Response) => {
  try {
    const { fileData, source } = req.body;

    // Validate source (manual vs automated)
    if (source === 'automated') {
      // Validate Lambda signature
      if (!validateLambdaSignature(req)) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    }

    // Process file data
    const games = await processFileData(fileData);
    await gameService.createGames(games);

    res.json({
      message: 'Database populated successfully',
      count: games.length,
    });
  } catch (error) {
    console.error('Population error:', error);
    res.status(500).json({ error: 'Failed to populate database' });
  }
});
```

2. **Lambda Function**

```typescript
export const handler = async (event: S3Event) => {
  try {
    const bucket = event.Records[0].s3.bucket.name;
    const key = event.Records[0].s3.object.key;

    // Download and process file
    const fileData = await downloadFromS3(bucket, key);
    const processedData = await processFile(fileData);

    // Call API endpoint
    await callPopulateAPI(processedData);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Processing completed' }),
    };
  } catch (error) {
    console.error('Lambda error:', error);
    throw error;
  }
};
```

### Benefits of New Architecture

1. **Automation**

   - No manual intervention required
   - Consistent processing schedule
   - Reduced human error

2. **Scalability**

   - Lambda automatically scales
   - Handles multiple files concurrently
   - Cost-effective for sporadic processing

3. **Reliability**

   - Built-in retry mechanisms
   - Error handling and monitoring
   - Dead letter queue for failed processing

4. **Monitoring**
   - Detailed CloudWatch metrics
   - Processing success/failure tracking
   - Performance monitoring

### Implementation Steps

1. Set up AWS EventBridge rule
2. Create Lambda function
3. Modify API endpoint
4. Set up monitoring
5. Test with sample data
6. Deploy to production
7. Monitor and adjust as needed

This solution provides a robust, scalable, and maintainable way to handle automated data ingestion while maintaining security and reliability.
