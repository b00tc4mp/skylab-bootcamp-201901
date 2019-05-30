import { gql } from 'apollo-server';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { createRandomUser, fillDbRandomUsers, userAndPlainPassword } from '../../../common/test-utils';
import { UserModel } from '../../../models/user';
import { gCall } from '../../../utils/testing-utils/gqlCall';
import { SUPERADMIN_ROLE } from '../../../models/user';

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

  const userFields = `
    id
    name
    surname
    email
    role
  `;

  const query = gql`
    query {
      listAllUsers {
        ${userFields}
      }
    }
  `;

  let users: userAndPlainPassword[];

  beforeEach(async () => {
    await UserModel.deleteMany({});
    users = [];
    await fillDbRandomUsers(users);
  });

  it('should list all users', async () => {
    const superadmin = await createRandomUser(SUPERADMIN_ROLE);
    const response = await gCall({
      source: query,
      ctx: {
        userId: superadmin.id,
      },
    });
    if (response.errors) console.log(response.errors);
    expect(response).not.to.have.property('errors');
    expect(response).to.have.property('data');
    const expectedAllUsers = [superadmin, ...users.map(u => u.user)].map(({ id, name, surname, email, role } : any) => ({ id, name, surname, email, role }))
    const { listAllUsers } = response.data as any;
    const plainListAllUsers = listAllUsers.map(({ id, name, surname, email, role } : any) => ({ id, name, surname, email, role })); 
    expect(listAllUsers)
      .to.be.instanceOf(Array)
      .and.to.have.lengthOf(users.length + 1);
    expect(plainListAllUsers).to.deep.members(expectedAllUsers);
  });
});
//
