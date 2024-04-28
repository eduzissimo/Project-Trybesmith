import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import { User } from '../../../src/types/User';
import userService from '../../../src/services/user.service';
import userController from '../../../src/controller/user.controller';

chai.use(sinonChai);

describe('UsersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it ('Verifica se retorna todos os usuários', async function () {
    const users: User[] = [
      { id: 1, username: 'username', vocation: 'vocation', level: 1, password: 'password' },
      { id: 2, username: 'username2', vocation: 'vocation2', level: 2, password: 'password2' },
    ];
    const findAll = sinon.stub(userService, 'getAllUsers').resolves(users as any);
    await userController.getAllUsers(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(users);
    expect(findAll).to.have.been.calledOnce;
  });
});
