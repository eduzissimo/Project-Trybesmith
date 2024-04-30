import { expect } from 'chai';
import sinon from 'sinon';
import userService from '../../../src/services/user.service';
import UserModel from '../../../src/database/models/user.model';

describe('UsersService', function () {
  beforeEach(function () { sinon.restore(); });

  it('Verifica se cria um usuário', async function () {
    const user = {
      username: 'testUser',
      vocation: 'testVocation',
      level: 1,
      password: 'testPassword'
    };
    const userCreated = { id: 1, ...user };

    const create = sinon.stub(UserModel, 'create').resolves(userCreated as any);
    const result = await userService.createUser({ id: 1, ...user });

    expect(result).to.deep.equal(undefined);
    sinon.assert.calledOnce(create);
  });

  it('Verifica se busca um usuário pelo username', async function () {
    const findOneStub = sinon.stub(UserModel, 'findOne');
    findOneStub.resolves({} as any);

    await userService.getUserByUsername('testUser');

    sinon.assert.calledOnce(findOneStub);
    sinon.assert.calledWith(findOneStub, { where: { username: 'testUser' } });

    findOneStub.restore();
  });

  it('Verifica se compara senhas', async function () {
    const compareStub = sinon.stub(userService, 'comparePasswords');
    compareStub.resolves(true);

    const result = await userService.comparePasswords('testPassword', 'hashedPassword');

    expect(result).to.be.true;
    sinon.assert.calledOnce(compareStub);
    sinon.assert.calledWith(compareStub, 'testPassword', 'hashedPassword');

    compareStub.restore();
  });

  it('Verifica se retorna todos os usuários', async function () {
    const users = [
      { toJSON: () => ({ id: 1, username: 'username', productIds: [1, 2]})},
      { toJSON: () => ({ id: 2, username: 'username2', productIds: [3]})},
    ] as any[];
    const findAll = sinon.stub(UserModel, 'findAll').resolves(users as any);
    const result = await userService.getAllUsers();

    expect(result).to.deep.equal(
      users.map((user) => ({
        id: user.toJSON().id as number,
        username: user.toJSON().username as string,
        productIds: (user.toJSON().productIds || []).map((product: any) => product.id),
      }))
    );
    sinon.assert.calledOnce(findAll);

    findAll.restore();
  });
});
