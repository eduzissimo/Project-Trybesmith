import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import ProductsController from '../../../src/controller/products.controller';
import { Product } from '../../../src/types/Product';
import productsController from '../../../src/controller/products.controller';
import productsServices from '../../../src/services/product.service';

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it ('Verifica se cria um produto', async function () {
    req.body = {
      name: 'nameee',
      price: 10,
      category: 'category',
    };

    const emptyArray = {};
    const createProduct = sinon.stub(ProductsController, 'createProduct').resolves(emptyArray as any);
    const result = await productsController.createProduct(req, res);

    expect(result).to.deep.equal(emptyArray);
    expect(createProduct).to.have.been.calledOnce;
  });

  it ('Verifica se retorna erro 500 caso o produto não seja criado', async function () {
    req.body = {
      name: 'product',
      price: 10,
      category: 'category',
    };

    const err = { message: 'INVALID DATA' };

    const createProduct = sinon.stub(productsServices, 'createProduct').rejects(err);
    await productsController.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith(err);
    expect(createProduct).to.have.been.calledOnce;
  });
});
