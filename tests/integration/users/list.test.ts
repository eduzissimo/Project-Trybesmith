import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import { User } from '../../../src/types/User';

chai.use(chaiHttp);

describe('GET /users', function () {
  beforeEach(function () { sinon.restore(); });
  it ('Verifica se retorna um array de usuários', async function () {
    const users = [
      {
        username: 'Hagar',
        productIds: [
          1,
          2
        ],
      },
      {
        username: 'Eddie',
        productIds: [
          3,
          4
        ],
      },
      {
        username: 'Helga',
        productIds: [
          5
        ],
      },
    ]
    sinon.stub().resolves(users);

    const res = await chai.request(app).get('/users');

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(users);

    sinon.restore();
  });
});
