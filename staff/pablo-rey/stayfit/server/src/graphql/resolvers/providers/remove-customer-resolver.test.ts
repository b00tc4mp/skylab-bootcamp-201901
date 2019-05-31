import { gql } from 'apollo-server';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { createRandomUser, fillDbRandomUsers, userAndPlainPassword } from '../../../common/test-utils';
import { STAFF_ROLE, User, UserModel, USER_ROLE } from '../../../models/user';
import { gCall } from '../../../utils/testing-utils/gqlCall';
import { Provider, ProviderModel } from './../../../models/provider';
import { SUPERADMIN_ROLE } from './../../../models/user';
import faker = require('faker');

chai.use(chaiAsPromised);
const { expect } = chai;

dotenv.config();
const {
  env: { MONGODB_URL_TESTING },
} = process;

describe('remove customer from provider', function() {
  before(() => mongoose.connect(MONGODB_URL_TESTING!, { useNewUrlParser: true }));
  after(async () => await mongoose.disconnect());

  const mutation = gql`
    mutation RemoveProviderCustomer($providerId: String!, $userId: String!) {
      removeProviderCustomer(providerId: $providerId, userId: $userId)
    }
  `;

  let name: string;
  let customers: userAndPlainPassword[];
  let customersId: string[];
  let admin: User;
  let provider: Provider;

  beforeEach(async () => {
    await UserModel.deleteMany({});
    await ProviderModel.deleteMany({});
    name = faker.company.companyName();
    customers = [];
    await fillDbRandomUsers(customers, 5, USER_ROLE);
    customersId = customers.map(user => user.user.id!.toString());
    admin = await createRandomUser(STAFF_ROLE);
    provider = await ProviderModel.create({ name, admins: [admin], customers: customers.map(up => up.user) });
  });

  async function itWithUser(owner: User) {
    const customer = customers[0].user;
    const response = await gCall({
      source: mutation,
      variableValues: {
        providerId: provider.id,
        userId: customer.id,
      },
      ctx: {
        userId: owner.id.toString(),
      },
    });
    if (response.errors) console.log(response.errors);
    expect(response.errors).not.to.exist;
    expect(response.data!.removeProviderCustomer).to.be.true;

    const _provider = await ProviderModel.findById(provider.id);
    expect(_provider).not.to.be.null;
    const _customersId: string[] = _provider!.customers.map(customer => customer.toString());
    expect(_customersId).to.have.lengthOf(customers.length - 1);
    expect(_customersId).not.to.include(customer.id);
  }

  it('should remove customer of a provider with SUPERADMIN ', async () => {
    await itWithUser(await createRandomUser(SUPERADMIN_ROLE));
  });

  it('should remove customer of a provider with admin of provider ', async () => {
    await itWithUser(admin);
  });

  it('should return false if is not customer ', async () => {
    const owner = admin;
    const customer = await createRandomUser();
    const response = await gCall({
      source: mutation,
      variableValues: {
        providerId: provider.id,
        userId: customer.id,
      },
      ctx: {
        userId: owner.id.toString(),
      },
    });
    if (response.errors) console.log(response.errors);
    expect(response.errors).not.to.exist;
    expect(response.data!.removeProviderCustomer).to.be.false;

    const _provider = await ProviderModel.findById(provider.id);
    expect(_provider).not.to.be.null;
    const _customersId: string[] = _provider!.customers.map(customer => customer.toString());
    expect(_customersId).to.have.lengthOf(customers.length);
  });
});
