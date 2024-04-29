import { Request, Response } from 'express';
import productServices from '../services/product.service';

async function createProduct(req: Request, res: Response): Promise<void> {
  try {
    const product = await productServices.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(422).json({ message: '"userId" not found' });
  }
}

async function listAllProducts(_req: Request, res: Response): Promise<void> {
  try {
    const products = await productServices.listAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'INVALID DATA' });
  }
}

export default {
  createProduct,
  listAllProducts,
};