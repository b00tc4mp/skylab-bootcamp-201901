import { gql } from 'apollo-server';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { createTestProvider } from '../../../common/test-utils';
import { gCall } from '../../../common/test-utils/gqlCall';

chai.use(chaiAsPromised);
const { expect } = chai;
dotenv.config();
const {
  env: { MONGODB_URL_TESTING },
} = process;

describe('retrieve  own user data', () => {
  before(() => mongoose.connect(MONGODB_URL_TESTING!, { useNewUrlParser: true }));
  after(async () => await mongoose.disconnect());

  it('should retrieve user with correct data', async () => {
    const { admin, customers, provider } = await createTestProvider({ maxCustomers: 1, maxCoaches: 1 });
    const query = gql`
      query {
        me {
          id
          name
          role
          customerOf {
            id
            name
          }
          adminOf {
            id
            name
          }
        }
      }
    `;
    let res = await gCall({
      source: query,
      ctx: {
        userId: admin.id,
        role: admin.role,
      },
    });
    if (res.errors) console.log(res.errors);
    expect(res).not.to.have.property('errors');
    expect(res).to.have.property('data').and.not.to.be.null;
    let data = res.data!.me;
    expect(data!.name).to.be.equal(admin.name);
    expect(data!.role).to.be.equal(admin.role);
    expect(data!.adminOf).to.have.lengthOf(admin.adminOf.length);
    expect(data!.adminOf[0])
      .to.have.property('id')
      .and.to.be.equal(provider.id);
    expect(data!.adminOf[0]).to.have.property('name');
    expect(data!.customerOf).to.have.lengthOf(0);

    res = await gCall({
      source: query,
      ctx: {
        userId: customers[0].id,
        role: customers[0].role,
      },
    });
    if (res.errors) console.log(res.errors);
    expect(res).not.to.have.property('errors');
    expect(res).to.have.property('data').and.not.to.be.null;
    data = res.data!.me;
    expect(data!.name).to.be.equal(customers[0].name);
    expect(data!.role).to.be.equal(customers[0].role);
    expect(data!.adminOf).to.have.lengthOf(0);
    expect(data!.customerOf).to.have.lengthOf(1);
    expect(data!.customerOf[0])
      .to.have.property('id')
      .and.to.be.equal(provider.id);
  });
});
