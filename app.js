import dotenv from 'dotenv';
import express from 'express';
import { resolve } from 'path';

import homeRoutes from './src/routes/home';
import userRoutes from './src/routes/user';
import alunoRoutes from './src/routes/aluno';
import tokenRoutes from './src/routes/token';
import uploadRoutes from './src/routes/upload';
import loginRequired from './src/middlewares/loginRequired';

import './src/database';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, 'uploads')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/aluno/', loginRequired, alunoRoutes);
    this.app.use('/upload/', loginRequired, uploadRoutes);

    this.app.use('/token/', tokenRoutes);
  }
}

export default new App().app;
