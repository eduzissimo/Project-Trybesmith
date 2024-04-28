import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import ProductService from '../../../src/services/product.services';
import ProductModel from '../../../src/database/models/product.model';
import { Product } from '../../../src/types/Product';

chai.use(chaiHttp);

describe('POST /products', function () {
  beforeEach(function () { sinon.restore(); });
  it ('Verifica se cria um novo produto', async function () {
    const product = {
      name: 'Martelo de Thor',
      price: 30,
      userId: 1,
    };
    const productModel: Product = {
      id: 1,
      ...product,
    };
    const createProduct = sinon.stub(ProductService, 'createProduct').resolves(productModel as Product);
    const res = await chai.request(app).post('/products').send(product);
    expect(res).to.have.status(201);
    expect(res.body).to.be.eql(productModel);
    createProduct.restore();
  });
});
