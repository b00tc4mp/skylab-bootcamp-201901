import { gql } from 'apollo-server';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { createTestProvider, deleteModels } from '../../../common/test-utils';
import { gCall } from '../../../common/test-utils/gqlCall';

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

  beforeEach(() => deleteModels());

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
      const { name, superadmin } = await createTestProvider({});
      const response = await gCall({
        source: query,
        ctx: {
          userId: superadmin.id.toString(),
        },
      });
      if (response.errors) console.log(response.errors);
      expect(response.errors).not.to.exist;
      const { listProviders: list } = response.data!;
      expect(list)
        .to.be.instanceOf(Array)
        .and.to.have.lengthOf(1);
      expect(list[0].name).to.be.equal(name);
      expect(list[0].admins[0]).to.have.property('email');
      expect(list[0].coaches[0]).to.have.property('email');
      expect(list[0].customers[0]).to.have.property('email');
    });
  });

  describe('list of all providers public info', () => {
    it('should list providers data ', async () => {
      const { name, superadmin } = await createTestProvider({});
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
      const { listProvidersPublicInfo: list } = response.data!;

      expect(list[0].name).to.be.equal(name);
      expect(list)
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

      const { superadmin } = await createTestProvider({});
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
