import { gql } from 'apollo-server';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { UserModel, STAFF_ROLE, User } from '../../../data/models/user';
import { gCall } from '../../../common/test-utils/gqlCall';
import { ProviderModel, Provider } from '../../../data/models/provider';
import { SUPERADMIN_ROLE } from '../../../data/models/user';
import { createRandomUser, fillDbRandomUsers, userAndPlainPassword } from '../../../common/test-utils';
import faker = require('faker');

chai.use(chaiAsPromised);
const { expect } = chai;

dotenv.config();
const {
  env: { MONGODB_URL_TESTING },
} = process;

describe('update coaches of provider', function() {
  before(() => mongoose.connect(MONGODB_URL_TESTING!, { useNewUrlParser: true }));
  after(async () => await mongoose.disconnect());
  this.timeout(10000);

  const mutation = gql`
    mutation UpdateProviderCoaches($providerId: String!, $usersId: [String!]!) {
      updateProviderCoaches(providerId: $providerId, usersId: $usersId)
    }
  `;

  let name: string;
  let staffUsers: userAndPlainPassword[];
  let staffUsersId: string[];
  let admin: User;
  let provider: Provider;

  beforeEach(async () => {
    await UserModel.deleteMany({});
    await ProviderModel.deleteMany({});
    name = faker.company.companyName();
    staffUsers = [];
    await fillDbRandomUsers(staffUsers, 5, STAFF_ROLE);
    staffUsersId = staffUsers.map(user => user.user.id!.toString());
    admin = await createRandomUser(STAFF_ROLE);
    provider = await ProviderModel.create({ name, admins: [admin] });
  });

  async function itWithUser (owner: User) {
    const response = await gCall({
      source: mutation,
      variableValues: {
        providerId: provider.id,
        usersId: staffUsersId,
      },
      ctx: {
        userId: owner.id.toString(),
      },
    });
    if (response.errors) console.log(response.errors);
    expect(response.errors).not.to.exist;
    expect(response.data!.updateProviderCoaches).to.be.true;

    const _provider = await ProviderModel.findById(provider.id).populate('coaches');
    expect(_provider).not.to.be.null;
    expect(_provider!.name).to.be.equal(provider.name);
    const _coachesId: string[] = _provider!.coaches.map(coach => (coach as any).id);
    expect(_coachesId).to.deep.equal(staffUsersId);
    (_provider!.coaches as User[]).forEach(coach => expect(coach.coachOf).includes(provider.id) )

  }

  it('should update coaches of a provider with SUPERADMIN ', async () => {
    await itWithUser(await createRandomUser(SUPERADMIN_ROLE));
  });

  it('should update coaches of a provider with admin of provider ', async () => {
    await itWithUser(admin)
  });

});
