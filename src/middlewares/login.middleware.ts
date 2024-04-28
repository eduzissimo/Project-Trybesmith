import { Request, Response, NextFunction } from 'express';

const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: '"username" and "password" are required' });
    return;
  }
  if (typeof username !== 'string') {
    res.status(401).json({ message: '"Username invalid' });
  }
  if (typeof password !== 'string') {
    res.status(401).json({ message: 'Password invalid' });
  }
  next();
};

export default validateLogin;