import { expect } from 'chai';
import sinon from 'sinon';
import userService from '../../../src/services/user.service';
import UserModel from '../../../src/database/models/user.model';

describe('UsersService', function () {
  beforeEach(function () { sinon.restore(); });

  it ('Verifica se cria um usuário', async function () {
    const findAllStub = sinon.stub(UserModel, 'findAll');
    findAllStub.resolves([
      {
        get: (field: undefined) => {
          if (field === 'username') return 'testUser';
          if (field === 'productIds') return [{ id: 1 }, { id: 2 }];
        },
        toJSON: () => ({ username: 'testUser', productIds: [{ id: 1 }, { id: 2 }] }),
      },
    ] as any[]);

    const users = await userService.getAllUsers();

    expect(users).to.be.an('array');
    expect(users.length).to.equal(1);
    expect(users[0]).to.have.property('username', 'testUser');
    expect(users[0]).to.have.property('productIds').to.deep.equal([1, 2]);

    findAllStub.restore();
  });

  it('')
});
