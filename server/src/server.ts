import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';  
import routes from './routes/index.js'; 
import { sequelize } from './models/index.js';
import { authenticateToken } from './middleware/auth.js'; 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('../client/dist')); 

app.use(express.json());
app.use(routes);

app.get('/protected', authenticateToken, (_req: Request, res: Response) => {
  res.send('This is a protected route');
});

app.use((_req: Request, res: Response) => {
  res.status(404).send('Not Found');
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});

