import { expect } from 'chai';
import sinon from 'sinon';
import UserModel from '../../../src/database/models/user.model';
import loginService from '../../../src/services/login.service';
import bcrypt from 'bcryptjs';

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });

  it ('Verifica se retorna null caso o usuário não esteja logado', async function () {
    const user = {
      username: 'username',
      password: 'password',
    }
    const login = sinon.stub(UserModel, 'findOne').resolves(null);
    const result = await loginService.login(user);

    expect(login).to.have.been.calledOnce;
    expect(result).to.be.equal(null);

    login.restore();
  });

  it ('Verifica se retorna null quando a senha é inválida', async function () {
    const user = {
      username: 'username',
      password: 'password',
    }

    const alreadyLogged = {
      getDataValue: sinon.stub().returns('xablausk')
    }
    const login = sinon.stub(UserModel, 'findOne').resolves(alreadyLogged as any);
    const getCryptic = sinon.stub(bcrypt, 'compareSync').returns(false);

    const result = await loginService.login(user);

    expect(login).to.have.been.calledOnce;
    expect(getCryptic).to.have.been.calledOnce;
    expect(result).to.be.equal(null);
  });
});
