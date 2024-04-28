import { Request, Response } from 'express';
import UserService from '../services/user.service';

async function getAllUsers(_req: Request, res: Response): Promise<void> {
  const users = await UserService.getAllUsers();
  res.status(200).json(users);
}

export default {
  getAllUsers,
};