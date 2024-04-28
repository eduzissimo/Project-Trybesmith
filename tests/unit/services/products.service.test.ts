import { expect } from 'chai';
import sinon from 'sinon';
import ProductModel from '../../../src/database/models/product.model';
import productServices from '../../../src/services/product.service';

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });

  it('Verifica se cria um produto', async function () {
    const product = {
      name: 'Martelo de Thor',
      price: '30 peças de ouro',
      userId: 1
    }
    const productCreated = { id: 1, ...product };

    const createProduct = sinon.stub(ProductModel, 'create').resolves(productCreated as any);
    const result = await productServices.createProduct({ id: 1, ...product, price: 30 });

    expect(result).to.deep.equal(productCreated);
    sinon.assert.calledOnce(createProduct);
  });

  it ('Verifica se lista todos os produtos', async function () {
    const product = {
      name: 'Martelo de Thor',
      price: '30 peças de ouro',
      userId: 1
    }
    const newProducts = [{ id: 1, ...product}]
    const findAll = sinon.stub(ProductModel, 'findAll').resolves(newProducts as any);
    const result = await productServices.listAllProducts();

    expect(result).to.deep.equal(newProducts);
    sinon.assert.calledOnce(findAll);
  });
});

