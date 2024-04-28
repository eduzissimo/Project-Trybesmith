import { Request, Response } from 'express';
import productServices from '../../services/product.services';
// import mapStatusHTTP from '../../utils/mapStatusHTTP';

async function createProduct(req: Request, res: Response): Promise<void> {
  try {
    const product = await productServices.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'INVALID DATA' });
  }
}

export default {
  createProduct,
};