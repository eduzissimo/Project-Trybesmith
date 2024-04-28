import ProductModel, {
  ProductInputtableTypes } from '../database/models/product.model';
import { Product } from '../types/Product';

async function createProduct(data: ProductInputtableTypes): Promise<Product> {
  const product = await ProductModel.create(data);
  return product.toJSON() as Product;
}

export default {
  createProduct,
};