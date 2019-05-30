import { gql } from 'apollo-server';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { createRandomUser, fillDbRandomUsers, userAndPlainPassword } from '../../../common/test-utils';
import { UserModel } from '../../../models/user';
import { gCall } from '../../../utils/testing-utils/gqlCall';
import { ProviderModel } from './../../../models/provider';
import { SUPERADMIN_ROLE } from './../../../models/user';
import faker = require('faker');

chai.use(chaiAsPromised);
const { expect } = chai;

dotenv.config();
const {
  env: { MONGODB_URL_TESTING },
} = process;

describe('update admins of a provider', function() {
  before(() => mongoose.connect(MONGODB_URL_TESTING!, { useNewUrlParser: true }));
  after(async () => await mongoose.disconnect());
  this.timeout(5000);

  const mutation = gql`
    mutation UpdateProviderAdmins ($providerId: String!, $usersId: [String!]!) {
      updateProviderAdmins (providerId: $providerId, usersId: $usersId)
    }
  `;

  beforeEach(async () => {
    await UserModel.deleteMany({});
    await ProviderModel.deleteMany({});
  });

  it('should update the admins of a provider', async () => {
    const name = faker.company.companyName();
    const provider = await ProviderModel.create({ name });
    const superadmin = await createRandomUser(SUPERADMIN_ROLE);
    const users: userAndPlainPassword[] = [];
    await fillDbRandomUsers(users);
    const usersId = users.map(({ user: { id } }) => id);
    const response = await gCall({
      source: mutation,
      variableValues: {
        providerId: provider.id,
        usersId,
      },
      ctx: {
        userId: superadmin.id,
      },
    });
    if (response.errors) console.log(response.errors);
    expect(response).not.to.have.property('errors');
    expect(response).to.have.property('data');
    expect(response.data!.updateProviderAdmins).to.be.true;

    const _provider = await ProviderModel.findById(provider.id);
    expect(_provider).not.to.be.null;
    const { admins, coaches, customers } = _provider!;
    expect(admins).to.have.lengthOf(users.length);
    expect(coaches).to.have.lengthOf(0);
    expect(customers).to.have.lengthOf(0);
  });
});
