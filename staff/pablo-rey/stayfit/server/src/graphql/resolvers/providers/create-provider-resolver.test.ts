import { gql, addMockFunctionsToSchema } from 'apollo-server';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { createRandomUser, fillDbRandomUsers, userAndPlainPassword } from '../../../common/test-utils';
import { UserModel, User } from '../../../models/user';
import { gCall } from '../../../utils/testing-utils/gqlCall';
import { SUPERADMIN_ROLE } from '../../../models/user';
import { ProviderModel } from './../../../models/provider';
import faker = require('faker');
import { Provider } from './../../../models/provider';

chai.use(chaiAsPromised);
const { expect } = chai;

dotenv.config();
const {
  env: { MONGODB_URL_TESTING },
} = process;

describe('list all users', function() {
  before(() => mongoose.connect(MONGODB_URL_TESTING!, { useNewUrlParser: true }));
  after(async () => await mongoose.disconnect());
  this.timeout(5000);

  const fields = `
    id
    name
    admins
    coaches
    customers
  `;

  const mutation = gql`
    mutation CreateProvider ($name: String!) {
      createProvider (name: $name)
    }
  `;

  beforeEach(async () => {
    await UserModel.deleteMany({});
    await ProviderModel.deleteMany({});
  });

  it('should create a provider', async () => {
    const superadmin = await createRandomUser(SUPERADMIN_ROLE);
    const name = faker.company.companyName();
    const response = await gCall({
      source: mutation,
      variableValues: {
        name,
      },
      ctx: {
        userId: superadmin.id,
      },
    });
    if (response.errors) console.log(response.errors);
    expect(response).not.to.have.property('errors');
    expect(response).to.have.property('data');
    const id = response.data!.createProvider;
    expect(id).not.to.be.undefined;
    const _provider = await ProviderModel.findById(id);
    expect(_provider).not.to.be.null;
    expect(_provider!.name).to.be.equal(name);
    const { admins, coaches, customers } = _provider!;
    expect(admins).to.have.lengthOf(0);
    expect(coaches).to.have.lengthOf(0);
    expect(customers).to.have.lengthOf(0);
  });
});
//
