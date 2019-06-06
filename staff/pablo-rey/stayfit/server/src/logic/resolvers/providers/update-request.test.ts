import { gql } from 'apollo-server';
import * as dotenv from 'dotenv';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as mongoose from 'mongoose';
import { gCall } from '../../../common/test-utils/gqlCall';
import { User, UserModel, USER_ROLE, ADMIN_ROLE } from '../../../data/models/user';
import { Provider, ProviderModel } from '../../../data/models/provider';
import {
  ACCEPT,
  PENDING,
  DENIEDBYPROVIDER,
  DENIEDBYUSER,
  REQUESTBECUSTOMER,
  REQUESTBEPROVIDER,
  RequestCustomer,
  RequestCustomerModel,
} from '../../../data/models/request';
import { createRandomUser, deleteModels } from '../../../common/test-utils';

chai.use(chaiAsPromised);
const { expect } = chai;

dotenv.config();
const {
  env: { MONGODB_URL_TESTING },
} = process;

describe('update a request to be customer', function() {
  this.timeout(10000);
  before(async () => {
    await mongoose.connect(MONGODB_URL_TESTING!, { useNewUrlParser: true });
    await deleteModels();
  });
  after(async () => await mongoose.disconnect());

  const mutation = gql`
    mutation UpdateRequestCustomer($userId: String!, $providerId: String!, $status: String!) {
      updateRequestCustomer(userId: $userId, providerId: $providerId, status: $status)
    }
  `;

  let user: User;
  let admin: User;
  let provider: Provider;
  let request: RequestCustomer;

  beforeEach(async () => {
    user = await createRandomUser(USER_ROLE);
    admin = await createRandomUser(ADMIN_ROLE);
    provider = await ProviderModel.create({ name: 'test', admins: [admin] });
    await UserModel.findByIdAndUpdate(admin.id, { adminOf: [provider] });
  });

  async function createRequest(type: string, status: string) {
    return (request = await RequestCustomerModel.create({ user, provider, type, status }));
  }

  async function send(type: string, initialStatus: string, newStatus: string, owner: User) {
    await createRequest(type, initialStatus);
    return await gCall({
      source: mutation,
      variableValues: {
        providerId: provider.id,
        userId: user.id,
        status: newStatus,
      },
      ctx: {
        userId: owner.id.toString(),
        role: owner.role,
      },
    });
  }

  async function expectToBeOk(response: any, newStatus: string) {
    expect(response).not.to.have.property('error');
    expect(response).to.have.property('data').and.not.to.be.null;
    expect(response.data!.updateRequestCustomer).to.be.true;
    const _request = await RequestCustomerModel.findOne({ provider, user });
    expect(_request).not.to.be.null;
    expect(_request!.status).to.be.equal(newStatus);
  }

  async function expectToFail(response: any, oldStatus: string) {
    expect(response).not.to.have.property('error');
    expect(response).to.have.property('data').and.not.to.be.null;
    expect(response.data!.updateRequestCustomer).to.be.false;
    const _request = await RequestCustomerModel.findOne({ provider, user });
    expect(_request).not.to.be.null;   
    expect(_request!.status).to.be.equal(oldStatus);
  }

  it('should create a pending request if not previous request present', async () => {
    const res = await send(REQUESTBECUSTOMER, PENDING, ACCEPT, admin);
    await expectToBeOk(res, ACCEPT);
  });

  it('should update a request from PENDING(from customer) to ACCEPT(from provider)', async () => {
    const res = await send(REQUESTBECUSTOMER, PENDING, ACCEPT, admin);
    await expectToBeOk(res, ACCEPT);
  });

  it('should update a request from PENDING(from provider) to ACCEPT(from customer)', async () => {
    const res = await send(REQUESTBEPROVIDER, PENDING, ACCEPT, user);
    await expectToBeOk(res, ACCEPT);
  });

  it('should update a request from DENIEDBYUSER to ACCEPT(from customer)', async () => {
    const res = await send(REQUESTBECUSTOMER, DENIEDBYUSER, ACCEPT, user);
    await expectToBeOk(res, ACCEPT);
  });

  it('should update a request from DENIEDBYPROVIDER to ACCEPT(from provider)', async () => {
    const res = await send(REQUESTBEPROVIDER, DENIEDBYPROVIDER, ACCEPT, admin);
    await expectToBeOk(res, ACCEPT);
  });

  it('should update a request from PENDING(from customer) to DENIED(from provider)', async () => {
    const res = await send(REQUESTBECUSTOMER, PENDING, DENIEDBYPROVIDER, admin);
    await expectToBeOk(res, DENIEDBYPROVIDER);
  });
  it('should update a request from PENDING(from provider) to DENIED(from customer)', async () => {
    const res = await send(REQUESTBEPROVIDER, PENDING, DENIEDBYUSER, user);
    await expectToBeOk(res, DENIEDBYUSER);
  });

  describe('fails', () => {
    it('should fail a request from PENDING(from customer) to ACCEPT(from provider)', async () => {
      const res = await send(REQUESTBECUSTOMER, PENDING, ACCEPT, user);
      await expectToFail(res, PENDING);
    });

    it('should fail a request from PENDING(from provider) to ACCEPT(from customer)', async () => {
      const res = await send(REQUESTBEPROVIDER, PENDING, ACCEPT, admin);
      await expectToFail(res, PENDING);
    });

    it('should fail a request from DENIEDBYUSER to ACCEPT(from customer)', async () => {
      const res = await send(REQUESTBECUSTOMER, DENIEDBYUSER, ACCEPT, admin);
      await expectToFail(res, DENIEDBYUSER);
    });

    it('should fail a request from DENIEDBYPROVIDER to ACCEPT(from provider)', async () => {
      const res = await send(REQUESTBEPROVIDER, DENIEDBYPROVIDER, ACCEPT, user);
      await expectToFail(res, DENIEDBYPROVIDER);
    });

    it('should fail a request from PENDING(from customer) to DENIED(from provider)', async () => {
      const res = await send(REQUESTBECUSTOMER, PENDING, DENIEDBYPROVIDER, user);
      await expectToFail(res, PENDING);
    });
    it('should fail a request from PENDING(from provider) to DENIED(from customer)', async () => {
      const res = await send(REQUESTBEPROVIDER, PENDING, DENIEDBYUSER, admin);
      await expectToFail(res, PENDING);
    });
  });
});
