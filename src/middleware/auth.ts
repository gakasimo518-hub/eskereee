import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  sub: string; // user identifier
  iat?: number;
  exp?: number;
  // add other custom claims if needed
}

// Extend Express Request to include the decoded JWT payload
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

/**
 * Middleware that blocks all requests without a valid JWT.
 * It expects the token in the `Authorization` header as `Bearer <token>`.
 * On success, the decoded payload is attached to `req.user`.
 * On failure, it responds with HTTP 401.
 */
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error('JWT_SECRET environment variable is not set.');
    return res.status(500).json({ message: 'Server configuration error' });
  }

  try {
    const payload = jwt.verify(token, secret) as JwtPayload;
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid authentication token' });
  }
};

export default authMiddleware;