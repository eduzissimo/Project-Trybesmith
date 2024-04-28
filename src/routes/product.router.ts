import express from 'express';
import productsController from '../controller/products.controller';

const productsRouter = express.Router();

productsRouter.post('/', productsController.createProduct);
productsRouter.get('/', productsController.listAllProducts);

export default productsRouter;