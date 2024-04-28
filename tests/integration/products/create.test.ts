import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import ProductService from '../../../src/services/product.service';
import { Product } from '../../../src/types/Product';

chai.use(chaiHttp);

describe('POST /products', function () {
  beforeEach(function () { sinon.restore(); });
  it ('Verifica se cria um novo produto', async function () {
    const product = {
      id: 1,
      name: 'Excalibur',
      price: 10,
      userId: 1
    };
    const createProduct = sinon.stub(ProductService, 'createProduct').resolves(product as Product);
    const res = await chai.request(app).post('/products').send(product);

    expect(res.status).to.equal(422);
    expect(res.body).to.deep.equal({ message: '"price" must be a string' });
    createProduct.restore();
  });

  it('Verifica se retorna erro 422 ao criar produto sem userId', async function () {
    const product = {
      id: 1,
      name: 'Excalibur',
      price: 10,
    };
    const createProduct = sinon.stub(ProductService, 'createProduct').throws(new Error());
    const res = await chai.request(app).post('/products').send(product);

    expect(res.status).to.equal(422);
    expect(res.body).to.deep.equal({ message: '"price" must be a string' });
    createProduct.restore();
  });
});
