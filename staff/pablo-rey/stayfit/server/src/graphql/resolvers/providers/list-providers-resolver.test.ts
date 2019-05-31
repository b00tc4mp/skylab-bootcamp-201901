import { gql } from 'apollo-server';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { createRandomUser, fillDbRandomUsers, userAndPlainPassword } from '../../../common/test-utils';
import { UserModel, STAFF_ROLE, User, USER_ROLE } from '../../../models/user';
import { gCall } from '../../../utils/testing-utils/gqlCall';
import { ProviderModel, Provider } from '../../../models/provider';
import { SUPERADMIN_ROLE } from '../../../models/user';
import faker = require('faker');

chai.use(chaiAsPromised);
const { expect } = chai;

dotenv.config();
const {
  env: { MONGODB_URL_TESTING },
} = process;

describe('list of providers', function() {
  before(() => mongoose.connect(MONGODB_URL_TESTING!, { useNewUrlParser: true }));
  after(async () => await mongoose.disconnect());
  this.timeout(10000);

  let name: string;
  let superadmin: User;
  let admin: User;
  let coachesUserPassword: userAndPlainPassword[];
  let coaches: User[];
  let coachesUserId: string[];
  let customersUserPassword: userAndPlainPassword[];
  let customers: User[];
  let customersId: string[];
  let provider: Provider;

  beforeEach(async () => {
    await UserModel.deleteMany({});
    await ProviderModel.deleteMany({});
    name = faker.company.companyName();
    superadmin = await createRandomUser(SUPERADMIN_ROLE);
    admin = await createRandomUser(STAFF_ROLE);
    coachesUserPassword = [];
    await fillDbRandomUsers(coachesUserPassword, 5, STAFF_ROLE);
    coaches = coachesUserPassword.map(up => up.user);
    coachesUserId = coachesUserPassword.map(up => up.user.id!.toString());
    customersUserPassword = [];
    await fillDbRandomUsers(customersUserPassword, 10, USER_ROLE);
    customers = customersUserPassword.map(up => up.user);
    customersId = customersUserPassword.map(up => up.user.id!.toString());
    provider = await ProviderModel.create({ name, admins: [admin], coaches, customers });
  });

  describe('list of all providers', () => {
    const query = gql`
      query {
        listProviders {
          name
          admins {
            id
            email
          }
          coaches {
            id
            email
          }
          customers {
            id
            email
          }
        }
      }
    `;

    it('should list providers in full with SUPERADMIN ', async () => {
      const response = await gCall({
        source: query,
        ctx: {
          userId: superadmin.id.toString(),
        },
      });
      if (response.errors) console.log(response.errors);
      expect(response.errors).not.to.exist;
      const { listProviders } = response.data!;
      expect(listProviders)
        .to.be.instanceOf(Array)
        .and.to.have.lengthOf(1);
      expect(listProviders[0].admins[0]).to.have.property('email');
      expect(listProviders[0].coaches[0]).to.have.property('email');
      expect(listProviders[0].customers[0]).to.have.property('email');
    });
  });

  describe('list of all providers public info', () => {
    it('should list providers data ', async () => {
      const query = gql`
        query {
          listProvidersPublicInfo {
            name
          }
        }
      `;
      const response = await gCall({
        source: query,
        ctx: {
          userId: superadmin.id.toString(),
        },
      });
      if (response.errors) console.log(response.errors);
      expect(response.errors).not.to.exist;
      const { listProvidersPublicInfo } = response.data!;
      expect(listProvidersPublicInfo)
        .to.be.instanceOf(Array)
        .and.to.have.lengthOf(1);
    });

    it('should fail to retrieve administrative info from providers providers in full with SUPERADMIN ', async () => {
      const query = gql`
      query {
        listProvidersPublicInfo {
          name
          admins {
            id
            email
          }
          coaches {
            id
            email
          }
          customers {
            id
            email
          }
        }
      }
    `;
      const response = await gCall({
        source: query,
        ctx: {
          userId: superadmin.id.toString(),
        },
      });
      expect(response.errors).to.exist;
      expect(response.data).not.to.exist;
    });

  });
});
