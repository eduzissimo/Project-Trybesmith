import express from 'express';
import productsController from '../controller/products.controller';
import {
  validateProductName,
  validateProductPrice,
  validateProductUserId,
} from '../middlewares/product.middleware';

const productsRouter = express.Router();

productsRouter.post(
  '/',
  validateProductName,
  validateProductPrice,
  validateProductUserId,
  productsController.createProduct,
);
productsRouter.get('/', productsController.listAllProducts);

export default productsRouter;