import { gql } from 'apollo-server';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import * as mongoose from 'mongoose';
import { UserModel } from '../../../data/models/user';
import { random } from '../../../common/utils';
import { expectError } from '../../../common/test-utils/error-handling';
import { gCall } from '../../../common/test-utils/gqlCall';
import { fillDbRandomUsers, userAndPlainPassword } from '../../../common/test-utils';

chai.use(chaiAsPromised);
const { expect } = chai;

dotenv.config();
const {
  env: { MONGODB_URL_TESTING },
} = process;

describe('invalidate credentials', function() {
  before(() => mongoose.connect(MONGODB_URL_TESTING!, { useNewUrlParser: true }));
  after(async () => await mongoose.disconnect());
  this.timeout(5000);

  const mutation = gql`
    mutation invalidateCredentials($userId: String!) {
      invalidateCredentials(userId: $userId)
    }
  `;

  let users: userAndPlainPassword[];
  let id: string;
  let role: string;
  let user: userAndPlainPassword;

  beforeEach(async () => {
    await UserModel.deleteMany({});
    users = [];
    await fillDbRandomUsers(users);
    user = random(users);
    id = user.user.id.toString();
    role= user.user.role;
  });

  it('should invalidate credential', async () => {
    const response = await gCall({
      source: mutation,
      variableValues: {
        userId: id,
      },
      ctx: {
        userId: id,
        role,
      },
    });
    expect(response).not.to.have.property('errors');
    expect(response).to.have.property('data');
    const { invalidateCredentials } = response.data as any;
    expect(invalidateCredentials).to.be.true;

    const _user = await UserModel.findById(id);
    expect(_user!.refreshTokenCount).to.be.greaterThan(user!.user.refreshTokenCount);
  });

  it('should fail if user not found', async () => {
    await UserModel.findByIdAndDelete(user.user.id);
    const response = await gCall({
      source: mutation,
      variableValues: {
        userId: id,
      },
      ctx: {
        userId: id,
        role,
      },
    });
    expectError(response, undefined, 'user not found');
  });
});
