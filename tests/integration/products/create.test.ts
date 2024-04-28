import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import ProductService from '../../../src/services/product.service';

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
    const createProduct = sinon.stub(ProductService, 'createProduct').resolves(product as any);
    const res = await chai.request(app).post('/products').send(product);

    expect(res.status).to.equal(422);
    expect(res.body).to.deep.equal({ message: '"price" must be a string' });
    createProduct.restore();
  });

  // it('Verifica se retorna erro 422 ao criar produto sem userId', async function () {
  //   const product = {
  //     id: 1,
  //     name: 'Excalibur',
  //     price: 10,
  //   };
  //   const createProduct = sinon.stub(ProductService, 'createProduct').throws(new Error());
  //   const res = await chai.request(app).post('/products').send(product);

  //   expect(res.status).to.equal(422);
  //   expect(res.body).to.deep.equal({ message: '"price" must be a string' });
  //   createProduct.restore();
  // });

  it ('Verifica se retorna erro 422 ao criar produto com userId inválido', async function () {
    const product = {
      id: 1,
      name: 'Excalibur',
      price: '100',
      userId: 'xablaus',
    };
    const createProduct = sinon.stub(ProductService, 'createProduct').throws(new Error());
    const res = await chai.request(app).post('/products').send(product);

    expect(res.status).to.equal(422);
    expect(res.body).to.deep.equal({ message: '"userId" must be a number' });
    createProduct.restore();
  });

  it ('Verifica se retorna erro 422 se preço do produto for menor que 3 caracteres', async function () {
    const product = {
      id: 1,
      name: 'Excalibur',
      price: '1',
      userId: 1
    };
    const createProduct = sinon.stub(ProductService, 'createProduct').throws(new Error());
    const res = await chai.request(app).post('/products').send(product);

    expect(res.status).to.equal(422);
    expect(res.body).to.deep.equal({ message: '"price" length must be at least 3 characters long' });
    createProduct.restore();
  });
});
