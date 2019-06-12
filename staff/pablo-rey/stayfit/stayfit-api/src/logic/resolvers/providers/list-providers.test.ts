import { ACCEPT } from './../../../data/enums';
import { REQUESTBECUSTOMER } from './../../../data/enums';
import { RequestCustomer, RequestCustomerModel } from './../../../data/models/request';
import { gql } from 'apollo-server';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { gCall } from '../../../common/test-utils/gqlCall';
import { createTestProvider, deleteModels } from '../../../common/test-utils';

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
          role: superadmin.role,
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
  });

  describe('list of all providers with respective requests for user', function() {
    this.timeout(15000);
    it('should list providers data with requests', async () => {
      const { customers, provider: provider1 } = await createTestProvider({});
      const user = customers[0];
      const request = await RequestCustomerModel.create({
        user,
        provider: provider1,
        type: REQUESTBECUSTOMER,
        status: ACCEPT,
      });
      const { provider: provider2 } = await createTestProvider({});
      const query = gql`
        query {
          listMyProvidersInfo {
            provider {
              id
              name
              bannerImageUrl
              portraitImageUrl
            }
            customerOf
            adminOf
            coachOf
            request {
              status
            }
          }
        }
      `;
      const response = await gCall({
        source: query,
        ctx: {
          userId: user.id,
          role: user.role,
        },
      });
      if (response.errors) console.log(response.errors);
      expect(response.errors).not.to.exist;
      expect(response.data).to.exist;
      const data = response.data!.listMyProvidersInfo;
      expect(data)
        .to.be.instanceOf(Array)
        .and.to.have.lengthOf(2);
      const indexProvider1 = data.findIndex((_provider: any) => provider1.id.toString() === _provider.provider.id);
      const indexProvider2 = indexProvider1 === 0 ? 1 : 0;
      expect(data[indexProvider1]).not.to.be.null;
      expect(data[indexProvider1].customerOf).to.be.true;
      expect(data[indexProvider1].request).not.to.be.null;
      expect(data[indexProvider1].request.status).to.be.equal(ACCEPT);
      expect(data[indexProvider2]).not.to.be.null;
      expect(data[indexProvider2].customerOf).to.be.false;
      expect(data[indexProvider2].request).to.be.null;
    });
  });
});
