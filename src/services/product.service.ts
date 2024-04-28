import ProductModel from '../database/models/product.model';
import { Product } from '../types/Product';

async function createProduct(product: Product): Promise<Product> {
  try {
    const productCreated = await ProductModel.create(product);
    return productCreated as unknown as Product;
  } catch {
    throw new Error('INVALID DATA');
  }
}

async function listAllProducts(): Promise<Product[]> {
  const products = await ProductModel.findAll();
  return products as unknown as Product[];
}

export default {
  createProduct,
  listAllProducts,
};