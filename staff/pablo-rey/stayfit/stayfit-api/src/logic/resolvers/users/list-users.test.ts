import { gql } from 'apollo-server';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { gCall } from '../../../common/test-utils/gqlCall';
import { SUPERADMIN_ROLE, REQUESTBECUSTOMER, PENDING } from '../../../data/enums';
import { RequestCustomerModel } from './../../../data/models/request';
import {
  createRandomUser,
  createTestProvider,
  deleteModels,
  fillDbRandomUsers,
  userAndPlainPassword,
} from '../../../common/test-utils';

chai.use(chaiAsPromised);
const { expect } = chai;

dotenv.config();
const {
  env: { MONGODB_URL_TESTING },
} = process;

describe('list all users', function() {
  before(() => mongoose.connect(MONGODB_URL_TESTING!, { useNewUrlParser: true }));
  after(async () => await mongoose.disconnect());
  this.timeout(15000);

  const userFields = `
    id
    name
    surname
    email
  `;

  const query = gql`
    query {
      listAllUsers {
        ${userFields}
        role
      }
    }
  `;

  let users: userAndPlainPassword[];

  beforeEach(async () => {
    await deleteModels();
    users = [];
    await fillDbRandomUsers(users);
  });

  it('should list all users', async () => {
    const superadmin = await createRandomUser(SUPERADMIN_ROLE);
    const response = await gCall({
      source: query,
      ctx: {
        userId: superadmin.id,
        role: superadmin.role,
      },
    });
    if (response.errors) console.log(response.errors);
    expect(response).not.to.have.property('errors');
    expect(response).to.have.property('data');
    const expectedAllUsers = [superadmin, ...users.map(u => u.user)].map(({ id, name, surname, email, role }: any) => ({
      id,
      name,
      surname,
      email,
      role,
    }));
    const { listAllUsers } = response.data as any;
    const plainListAllUsers = listAllUsers.map(({ id, name, surname, email, role }: any) => ({
      id,
      name,
      surname,
      email,
      role,
    }));
    expect(listAllUsers)
      .to.be.instanceOf(Array)
      .and.to.have.lengthOf(users.length + 1);
    expect(plainListAllUsers).to.deep.members(expectedAllUsers);
  });

  it('should list the customers of a provider', async () => {
    const { admin, customers, provider } = await createTestProvider({ maxCustomers: 20, maxCoaches: 1 });
    const request = await RequestCustomerModel.create({
      provider,
      user: customers[0],
      status: PENDING,
      type: REQUESTBECUSTOMER,
    });

    const query = gql`
    query ListCustomers ($providerId: String!){
      listCustomers (providerId: $providerId) {
        pending
        customer {
        ${userFields}
        }
        request {
          id
          type
          status          
        }
      }
    }
    `;
    const response = await gCall({
      source: query,
      variableValues: {
        providerId: provider.id,
      },
      ctx: {
        userId: admin.id,
        role: admin.role,
      },
    });
    if (response.errors) console.log(response.errors);
    expect(response).not.to.have.property('errors');
    expect(response).to.have.property('data');
    const { listCustomers } = response.data!;
    expect(listCustomers).to.exist;
    expect(listCustomers).not.to.be.null;
    expect(listCustomers)
      .to.be.instanceOf(Array)
      .and.to.have.lengthOf(customers.length);
    listCustomers.forEach((x: any) => expect(x).to.have.property('customer'));
    listCustomers.forEach((x: any) =>
      expect(x)
        .to.have.property('pending')
        .and.to.be.a('boolean')
    );
    expect((listCustomers as any[]).map(({ customer: { id, name, email } }) => ({ id, name, email }))).to.deep.equal(
      customers.map(({ id, name, email }) => ({ id, name, email }))
    );
    listCustomers.forEach((x: any) =>
      expect(x)
        .to.have.property('pending')
        .and.to.be.a('boolean')
    );
    expect(listCustomers[0].request).not.to.be.null;
    expect(listCustomers[0].request.id).to.be.equal(request.id);
    listCustomers.slice(1).forEach((c: any) => expect(c.request).to.be.null);
  });
});
