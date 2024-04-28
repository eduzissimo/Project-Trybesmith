import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import ProductModel from '../database/models/product.model';

async function getAllUsers(): Promise<{ username: string; productIds: number[] }[]> {
  const users = await UserModel.findAll({
    include: {
      model: ProductModel,
      as: 'productIds',
      attributes: ['id'],
    },
    attributes: ['username'],
  });

  return users.map((user) => ({
    id: user.get('id') as number,
    username: user.get('username') as string,
    productIds: (user.get('productIds') as { id: number }[])?.map((product) => product.id) || [],
  }));
}

async function getUserByUsername(username: string): Promise<void> {
  await UserModel.findOne({ where: { username } });
}

async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export default {
  getAllUsers,
  getUserByUsername,
  comparePasswords,
};