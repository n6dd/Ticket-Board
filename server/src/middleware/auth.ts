import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.sendStatus(401); 
    return;
  }

  const token = authHeader.split(' ')[1];
  const secretKey = process.env.JWT_SECRET_KEY || '';

  jwt.verify(token, secretKey, (err: VerifyErrors | null, decoded: unknown) => {
    if (err) {
      res.sendStatus(403); 
      return;
    }

    if (typeof decoded === 'object' && decoded && 'username' in decoded) {
      req.user = decoded as JwtPayload;
      next();
    } else {
      res.sendStatus(403); 
    }
  });
};


