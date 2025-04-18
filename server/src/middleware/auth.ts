import { Request, Response, NextFunction } from 'express';
import jwt, { JwtError } from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1]; 

    const secretKey = process.env.JWT_SECRET_KEY || '';

    jwt.verify(token, secretKey, (err: JwtError | null, user: JwtPayload | undefined) => {
      if (err) {
        return res.sendStatus(403); 
      }

      req.user = user;
      return next(); 
    });
  } else {
    return res.sendStatus(401);
  }
};


