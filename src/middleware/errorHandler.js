const http = require('http');

/**
 * Centralized error handling middleware for Express applications.
 *
 * It captures all errors thrown in the request pipeline, logs them,
 * and returns a consistent JSON response.
 *
 * Usage (in your main server file):
 *   const errorHandler = require('./src/middleware/errorHandler');
 *   app.use(errorHandler);
 *
 * The middleware respects the NODE_ENV environment variable:
 *   - In "development", the response includes the stack trace.
 *   - In any other environment, only the error message is exposed.
 */
function errorHandler(err, req, res, next) {
  // If headers have already been sent, delegate to the default Express handler
  if (res.headersSent) {
    return next(err);
  }

  // Determine HTTP status code (default to 500)
  const statusCode = err.statusCode || err.status || http.STATUS_CODES[500] ? 500 : err.statusCode;

  // Log the error (could be replaced with a proper logger)
  console.error(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -`, err);

  // Build the error response payload
  const responsePayload = {
    error: {
      message: err.message || http.STATUS_CODES[statusCode] || 'Internal Server Error',
    },
  };

  // Include stack trace only in development mode
  if (process.env.NODE_ENV === 'development' && err.stack) {
    responsePayload.error.stack = err.stack;
  }

  res.status(statusCode).json(responsePayload);
}

module.exports = errorHandler;