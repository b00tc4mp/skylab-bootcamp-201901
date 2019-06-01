import { gql } from 'apollo-server';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { createRandomUser, fillDbRandomUsers, userAndPlainPassword } from '../../../common/test-utils';
import { UserModel, STAFF_ROLE, User, USER_ROLE } from '../../../data/models/user';
import { gCall } from '../../../common/test-utils/gqlCall';
import { ProviderModel, Provider } from '../../../data/models/provider';
import { SUPERADMIN_ROLE } from '../../../data/models/user';
import faker = require('faker');

chai.use(chaiAsPromised);
const { expect } = chai;

dotenv.config();
const {
  env: { MONGODB_URL_TESTING },
} = process;

describe('add customer to provider', function() {
  before(() => mongoose.connect(MONGODB_URL_TESTING!, { useNewUrlParser: true }));
  after(async () => await mongoose.disconnect());

  const mutation = gql`
    mutation AddProviderCustomer($providerId: String!, $userId: String!) {
      addProviderCustomer(providerId: $providerId, userId: $userId)
    }
  `;

  let name: string;
  let customers: userAndPlainPassword[];
  let customersId: string[];
  let admin: User;
  let provider: Provider | null;

  beforeEach(async () => {
    await UserModel.deleteMany({});
    await ProviderModel.deleteMany({});
    name = faker.company.companyName();
    customers = [];
    await fillDbRandomUsers(customers, 5, USER_ROLE);
    customersId = customers.map(user => user.user.id!.toString());
    admin = await createRandomUser(STAFF_ROLE);
    provider = null;
  });
  
  async function itWithUser (owner: User) {
    provider = await ProviderModel.create({ name, admins: [admin] });
    const newCustomer = await createRandomUser(USER_ROLE)
    const response = await gCall({
      source: mutation,
      variableValues: {
        providerId: provider.id,
        userId: newCustomer.id,
      },
      ctx: {
        userId: owner.id.toString(),
      },
    });
    if (response.errors) console.log(response.errors);
    expect(response.errors).not.to.exist;
    expect(response.data!.addProviderCustomer).to.be.true;

    const _provider = await ProviderModel.findById(provider.id);
    expect(_provider).not.to.be.null;
    expect(_provider!.name).to.be.equal(provider.name);
    const _customersId: string[] = _provider!.customers.map(customer => customer.toString());
    expect(_customersId).to.have.lengthOf(1)
    expect(_customersId[0]).to.equal(newCustomer.id);
  }

  it('should add customer of a provider with SUPERADMIN ', async () => {
    await itWithUser(await createRandomUser(SUPERADMIN_ROLE));
  });

  it('should add customer of a provider with admin of provider ', async () => {
    await itWithUser(admin)
  });

  it('should not repeat a existing customer ', async () => {
    provider = await ProviderModel.create({ name, admins: [admin], customers: customers.map(up => up.user) });
    const newCustomer = customers[0].user;
    const response = await gCall({
      source: mutation,
      variableValues: {
        providerId: provider.id,
        userId: newCustomer.id,
      },
      ctx: {
        userId: admin.id.toString(),
      },
    });
    if (response.errors) console.log(response.errors);
    expect(response.errors).not.to.exist;
    expect(response.data!.addProviderCustomer).to.be.true;

    const _provider = await ProviderModel.findById(provider.id);
    expect(_provider).not.to.be.null;
    const _customersId: string[] = _provider!.customers.map(customer => customer.toString());
    expect(_customersId).to.have.lengthOf(customers.length)
  });

});
