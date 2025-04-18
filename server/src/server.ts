const forceDatabaseRefresh = false;

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

const __dirname = path.resolve();

// Serve static files from client/dist
app.use(express.static(path.join(__dirname, 'client', 'dist')));

app.use(express.json());
app.use(routes);

app.get('*', (_req: any, res: any) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
