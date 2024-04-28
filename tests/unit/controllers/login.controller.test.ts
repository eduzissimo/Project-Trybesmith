import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import loginController from '../../../src/controller/login.controller';
import loginService from '../../../src/services/login.service';

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it ('Verifica se retorna erro 401 ao tentar logar com usuário inválido', async function () {
    const userPayload = { username: 'Que nem maré - Jorge Vercillo', password: 'xablaus' };
    req.body = userPayload;

    sinon.stub(loginService, 'login').returns(Promise.resolve(null));
    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.have.been.calledWith({ message: 'Username or password invalid' });
  });

  it ('Verifica se retorna token ao logar com usuário válido', async function () {
    const userPayload = { username: 'Off the grid - Kanye West', password: 'xablaus' };
    req.body = userPayload;

    const token = 'token';
    sinon.stub(loginService, 'login').returns(Promise.resolve(token));
    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ token });
  });

});
