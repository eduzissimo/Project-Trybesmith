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

export default {
  getAllUsers,
};