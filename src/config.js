const path = require('path');
const dotenv = require('dotenv');

// Load .env file located at the project root
dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });

/**
 * Helper to ensure a required environment variable is present.
 * Throws an error during startup if the variable is missing.
 *
 * @param {string} name - The name of the environment variable.
 * @param {string} [fallback] - Optional fallback value.
 * @returns {string}
 */
function requiredEnv(name, fallback) {
  const value = process.env[name] ?? fallback;
  if (value === undefined || value === null || value === '') {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

// Core configuration object
const config = {
  // Application
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,

  // Database (example for PostgreSQL)
  db: {
    host: requiredEnv('DB_HOST', 'localhost'),
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    user: requiredEnv('DB_USER'),
    password: requiredEnv('DB_PASSWORD'),
    name: requiredEnv('DB_NAME'),
    // Connection string can be built if needed
    get connectionString() {
      return `postgresql://${this.user}:${encodeURIComponent(this.password)}@${this.host}:${this.port}/${this.name}`;
    },
  },

  // JWT / Authentication
  auth: {
    jwtSecret: requiredEnv('JWT_SECRET'),
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
  },

  // Miscellaneous services
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
  },

  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',
};

module.exports = config;