import express from 'express';
import setupUserRoutes from './user';
import setupOrderRoutes from './order';

function setupRoutes(app) {
  // User Routes
  const userRouter = express.Router();
  setupUserRoutes(userRouter);
  app.use('/api/user', userRouter);

  // Order Routes
  const orderRouter = express.Router();
  setupOrderRoutes(orderRouter);
  app.use('/api/order', orderRouter);
}

export default setupRoutes;
