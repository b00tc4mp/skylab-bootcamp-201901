import { gql } from 'apollo-server';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { USER_ROLE } from '../../../data/enums';
import { UserModel } from '../../../data/models/user';
import { gCall } from '../../../common/test-utils/gqlCall';

chai.use(chaiAsPromised);
const { expect } = chai;

dotenv.config();
const {
  env: { MONGODB_URL_TESTING },
} = process;

describe('retrieve user', function() {
  this.timeout(5000);
  before(() => mongoose.connect(MONGODB_URL_TESTING!, { useNewUrlParser: true }));
  after(async () => await mongoose.disconnect());

  it('retrieve user', async () => {
    const user = await UserModel.create({name:"test", surname:"test", email: "p@p.com", password:"bad-password", role:USER_ROLE})
    const query = gql`
      query RetrieveUser($userId: String!) {
        retrieveUser(userId: $userId) {
          id
          name
        }
      }
    `;
    const response = await gCall({
      source: query,
      variableValues: {
        userId: user.id,
      },
      ctx: {
        userId: user.id.toString(),
        role: user.role,
      },
    });
    if (response.errors) console.log(response.errors);
    expect(response.errors).not.exist;
    expect(response.data).to.exist;
    const result = response.data!.retrieveUser;
    expect(result).to.exist;
    expect(result.id).to.be.a('string');
    expect(result.name).to.be.equal(user.name);
    expect(result).not.to.have.property('password')
  });

  it('fail if userId is empty', async () => {
    const user = await UserModel.create({name:"test", surname:"test", email: "p@p.com", password:"bad-password", role:USER_ROLE})
    const query = gql`
      query RetrieveUser($userId: String!) {
        retrieveUser(userId: $userId) {
          id
          name
        }
      }
    `;
    const response = await gCall({
      source: query,
      variableValues: {
        userId: '',
      },
      ctx: {
        userId: user.id.toString(),
        role: user.role,
      },
    });
    expect(response.errors).exist;
    expect(response.data).not.to.exist;
  });
});
