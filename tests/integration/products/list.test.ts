import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import ProductService from '../../../src/services/product.service';
import { Product } from '../../../src/types/Product';
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('GET /products', function () {
  beforeEach(function () { sinon.restore(); });
  it ('Verifica se lista todos os produtos', async function () {
    const products = [
      {
        id: 1,
        name: 'Excalibur',
        price: 10,
        userId: 1
      },
      {
        id: 2,
        name: 'Espada Justiceira',
        price: 20,
        userId: 1
      },
    ];
    const listAllProducts = sinon.stub(ProductService, 'listAllProducts').resolves(products as Product[]);
    const res = await chai.request(app).get('/products');

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(products);

    listAllProducts.restore();
  });

  it ('Verifica se retorna erro 500 ao listar produtos', async function () {
    const listAllProducts = sinon.stub(ProductService, 'listAllProducts').throws(new Error());
    const res = await chai.request(app).get('/products');

    expect(res.status).to.equal(500);
    expect(res.body).to.deep.equal({ message: 'INVALID DATA' });

    listAllProducts.restore();
  });
});
