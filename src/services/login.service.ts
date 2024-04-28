import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { sign } from '../utils/jwt.payload';
import { User } from '../types/User';

async function login(user: Partial<User>): Promise<string | null> {
  const { username, password } = user;

  const userRecord = await UserModel.findOne({ where: { username } });

  if (!userRecord) return null;

  const userPassword = userRecord.getDataValue('password');
  const isPasswordValid = bcrypt.compareSync(password || '', userPassword);

  if (!isPasswordValid) return null;

  const { id } = userRecord.dataValues;
  const token = sign({ id, username });
  return token;
}

export default {
  login,
};