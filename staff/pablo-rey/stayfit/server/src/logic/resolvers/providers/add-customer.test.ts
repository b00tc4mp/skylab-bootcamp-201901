import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { gql } from 'apollo-server';
import { gCall } from '../../../common/test-utils/gqlCall';
import { Provider, ProviderModel } from '../../../data/models/provider';
import { ACCEPT, DENIEDBYUSER, REQUESTBECUSTOMER,  STAFF_ROLE, SUPERADMIN_ROLE,USER_ROLE  } from '../../../data/enums';
import { RequestCustomerModel } from '../../../data/models/request';
import { User, UserModel, } from '../../../data/models/user';
import { createRandomUser, deleteModels, fillDbRandomUsers, userAndPlainPassword } from '../../../common/test-utils';
import faker = require('faker');

chai.use(chaiAsPromised);
const { expect } = chai;

dotenv.config();
const {
  env: { MONGODB_URL_TESTING },
} = process;

describe('add customer to provider', function() {
  before(async () => {
    await mongoose.connect(MONGODB_URL_TESTING!, { useNewUrlParser: true });
    await deleteModels();
  });
  after(async () => await mongoose.disconnect());
  this.timeout(10000);

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
    name = faker.company.companyName();
    customers = [];
    await fillDbRandomUsers(customers, 5, USER_ROLE);
    customersId = customers.map(user => user.user.id!.toString());
    admin = await createRandomUser(STAFF_ROLE);
    provider = null;
  });

  async function itWithUser(owner: User, statusRequest: string = ACCEPT) {
    provider = await ProviderModel.create({ name, admins: [admin] });
    admin.adminOf = [provider];
    await UserModel.updateOne({ _id: admin.id }, admin);
    const newCustomer = await createRandomUser(USER_ROLE);
    if (statusRequest)
      await RequestCustomerModel.create({
        user: newCustomer,
        provider,
        type: REQUESTBECUSTOMER,
        status: statusRequest,
      });
    const response = await gCall({
      source: mutation,
      variableValues: {
        providerId: provider.id,
        userId: newCustomer.id,
      },
      ctx: {
        userId: owner.id.toString(),
        role: owner.role,
      },
    });
    if (response.errors) console.log(response.errors);
    expect(response.errors).not.to.exist;
    expect(response.data!.addProviderCustomer).to.be.true;

    const _provider = await ProviderModel.findById(provider.id);
    expect(_provider).not.to.be.null;
    expect(_provider!.name).to.be.equal(provider.name);
    const _customersId: string[] = _provider!.customers.map(customer => customer.toString());
    expect(_customersId).to.have.lengthOf(1);
    expect(_customersId[0]).to.equal(newCustomer.id);
    const _customer = await UserModel.findById(newCustomer.id);
    expect(_customer!.customerOf).to.include(provider.id);
  }

  it('should add customer of a provider with SUPERADMIN ', async () => {
    await itWithUser(await createRandomUser(SUPERADMIN_ROLE));
  });

  it('should add customer of a provider with admin of provider ', async () => {
    await itWithUser(admin);
  });

  it('should not repeat a existing customer ', async () => {
    provider = await ProviderModel.create({ name, admins: [admin], customers: customers.map(up => up.user) });
    admin.adminOf = [provider];
    await UserModel.updateOne({ _id: admin.id }, admin);
    const newCustomer = customers[0].user;
    await RequestCustomerModel.create({ user: newCustomer, provider, type: REQUESTBECUSTOMER, status: 'ACCEPT' });
    const response = await gCall({
      source: mutation,
      variableValues: {
        providerId: provider.id,
        userId: newCustomer.id,
      },
      ctx: {
        userId: admin.id.toString(),
        role: admin.role,
      },
    });
    if (response.errors) console.log(response.errors);
    expect(response.errors).not.to.exist;
    expect(response.data!.addProviderCustomer).to.be.true;

    const _provider = await ProviderModel.findById(provider.id);
    expect(_provider).not.to.be.null;
    const _customersId: string[] = _provider!.customers.map(customer => customer.toString());
    expect(_customersId).to.have.lengthOf(customers.length);
    const _customer = await UserModel.findById(newCustomer.id);
    expect(_customer!.customerOf).to.include(provider.id);
  });

  async function itWithBadRequest(owner: User, statusRequest: string | null = ACCEPT) {
    provider = await ProviderModel.create({ name, admins: [admin] });
    admin.adminOf = [provider];
    await UserModel.updateOne({ _id: admin.id }, admin);
    const newCustomer = await createRandomUser(USER_ROLE);
    if (statusRequest)
      await RequestCustomerModel.create({
        user: newCustomer,
        provider,
        type: REQUESTBECUSTOMER,
        status: statusRequest,
      });
    const response = await gCall({
      source: mutation,
      variableValues: {
        providerId: provider.id,
        userId: newCustomer.id,
      },
      ctx: {
        userId: owner.id.toString(),
        role: owner.role,
      },
    });
    expect(response.errors).to.exist;

    const _provider = await ProviderModel.findById(provider.id);
    expect(_provider).not.to.be.null;
    expect(_provider!.name).to.be.equal(provider.name);
    const _customersId: string[] = _provider!.customers.map(customer => customer.toString());
    expect(_customersId).to.have.lengthOf(0);
  }

  it('should fail if requestCustomer is not present', async () => {
    await itWithBadRequest(admin, null);
  });
  it('should fail if requestCustomer is not present', async () => {
    await itWithBadRequest(admin, DENIEDBYUSER);
  });
});
