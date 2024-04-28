import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('POST /login', function () {
  beforeEach(function () { sinon.restore(); });
  it ('Verifica se retorna erro 401 ao logar com usuário inválido', async function () {
    const res = await chai.request(app).post('/login').send({ username: 'invalid', password: 'invalid' });

    expect(res.status).to.equal(401);
    expect(res.body).to.deep.equal({ message: 'Username or password invalid' });
  });

  it(' Verifica se retorna erro 400 ao logar sem usuário e senha', async function () {
    const res = await chai.request(app).post('/login').send({});

    expect(res.status).to.equal(400);
    expect(res.body).to.deep.equal({ message: '"username" and "password" are required' });
  });

  it('Verifica se retorna erro 401 ao logar com senha inválida', async function () {
    const res = await chai.request(app).post('/login').send({ username: 'admin', password: 'invalid' });

    expect(res.status).to.equal(401);
    expect(res.body).to.deep.equal({ message: 'Username or password invalid' });
  });
});
