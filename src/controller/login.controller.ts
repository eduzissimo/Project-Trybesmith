import { Request, Response } from 'express';
import loginService from '../services/login.service';

async function login(req: Request, res: Response): Promise<void> {
  const auth = await loginService.login(req.body);

  if (!auth) {
    res.status(401).json({ message: 'Username or password invalid' });
    return;
  }
  res.status(200).json({ token: auth });
}

export default {
  login,
};