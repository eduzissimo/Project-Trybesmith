import { Request, Response, NextFunction } from 'express';
import UserModel from '../database/models/user.model';

const validateProductName = (req: Request, res: Response, next: NextFunction): void => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: '"name" is required' });
    return;
  }
  if (typeof name !== 'string') {
    res.status(422).json({ message: '"name" must be a string' });
    return;
  }
  if (name.length < 3) {
    res.status(422).json({ message: '"name" length must be at least 3 characters long' });
    return;
  }
  next();
};

const validateProductPrice = (req: Request, res: Response, next: NextFunction): void => {
  const { price } = req.body;

  if (!price) {
    res.status(400).json({ message: '"price" is required' });
    return;
  }
  if (typeof price !== 'string') {
    res.status(422).json({ message: '"price" must be a string' });
    return;
  }
  if (price.length < 3) {
    res.status(422).json({ message: '"price" length must be at least 3 characters long' });
    return;
  }
  next();
};

const validateProductUserId = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: '"userId" is required' });
  }
  if (typeof userId !== 'number') {
    return res.status(422).json({ message: '"userId" must be a number' });
  }

  const user = UserModel.findByPk(userId);

  if (!user) {
    return res.status(422).json({ message: '"userId" not found' });
  }
  return next();
};

export {
  validateProductName,
  validateProductPrice,
  validateProductUserId,
};