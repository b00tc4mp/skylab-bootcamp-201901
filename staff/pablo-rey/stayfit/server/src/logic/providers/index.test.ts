import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import * as faker from 'faker';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as bcrypt from 'bcryptjs';

import { random } from '../../utils/random';
import {
  randomUser,
  fillDbRandomUsers,
  userExpectations,
  createRandomUser,
  providerExpectations,
} from '../tests-utils';

import providerLogic from '.';
import {
  UserModel,
  UserType,
  ROLES,
  GUEST_ROLE,
  USER_ROLE,
  STAFF_ROLE,
  BUSINESS_ROLE,
  ADMIN_ROLE,
  SUPERADMIN_ROLE,
  User,
} from '../../models/user';
import {
  LogicError,
  AuthenticationError,
  ValidationError,
  AuthorizationError,
} from '../errors/index';
import { ProviderModel, Provider } from '../../models/provider';
import { Ref } from 'typegoose';
dotenv.config();
const {
  env: { MONGODB_URL_TESTING },
} = process;

chai.use(chaiAsPromised);
const { expect } = chai;

// faker.setLocale('es');

describe('providers', () => {
  let db: mongoose.Connection;

  before(() => mongoose.connect(MONGODB_URL_TESTING!, { useNewUrlParser: true }));
  after(async () => await mongoose.disconnect());

  beforeEach(async () => {
    await UserModel.deleteMany({});
    await ProviderModel.deleteMany({});
  });

  describe('create a provider', () => {
    it('should create a provider whose owner is SUPERADMIN', async () => {
      const owner = await createRandomUser(SUPERADMIN_ROLE);
      const name = faker.company.companyName();
      const provider = await providerLogic.create({ name }, owner);
      providerExpectations(provider);
      expect(provider)
        .to.have.property('name')
        .and.to.be.equal(name);
    });
    describe('fail authentication', () => {
      it('should fail to create a provider whose owner is not a SUPERADMIN', async () => {
        const otherRoles = ROLES.filter(role => role !== SUPERADMIN_ROLE);
        for (let role of otherRoles) {
          const owner = await createRandomUser(role);
          const name = faker.company.companyName();
          await expect(providerLogic.create({ name }, owner)).to.be.rejectedWith(
            AuthorizationError
          );
        }
      });
    });
  });

  describe('update staff fields', function() {
    this.timeout(10000);

    let name: string;
    let staffUsers: UserType[];
    let staffUserId: string[];

    beforeEach(async () => {
      name = faker.company.companyName();
      staffUsers = [];
      staffUsers = [];
      await fillDbRandomUsers(staffUsers, 5, STAFF_ROLE);
      staffUserId = staffUsers.map(user => user.id!.toString());
    });

    describe('update admins of provider', function() {
      it('should update admins of a provider with correct data', async () => {
        const provider = await ProviderModel.create({ name });
        const providerId = provider.id.toString();
        const owner = await createRandomUser(SUPERADMIN_ROLE);

        expect(await providerLogic.updateAdmins({ providerId, admins: staffUserId }, owner)).to.be
          .true;

        const _provider = await ProviderModel.findById(providerId).populate('admins');
        expect(_provider).not.to.be.null;
        expect(_provider!.name).to.be.equal(provider.name);
        const _adminsId: string[] = _provider!.admins.map(admin => (admin as any).id);
        expect(_adminsId).to.deep.equal(staffUserId);
        _provider!.admins.forEach(admin => userExpectations(admin, true));
      });

      it('should fail to update admins of a provider with owner not SUPERADMIN', async () => {
        const provider = await ProviderModel.create({ name });
        const providerId = provider.id.toString();
        const otherRoles = ROLES.filter(role => role !== SUPERADMIN_ROLE);
        for (let role of otherRoles) {
          const owner = await createRandomUser(role);
          const adminsId = staffUsers.map(admin => admin.id!.toString());

          await expect(
            providerLogic.updateAdmins({ providerId, admins: adminsId }, owner)
          ).to.be.rejectedWith(AuthorizationError);
        }
      });
    });

    describe('update coaches of provider', function() {
      it('should update coaches of a provider with SUPERADMIN ', async () => {
        const owner = await createRandomUser(SUPERADMIN_ROLE);
        const provider = await ProviderModel.create({ name });
        const providerId = provider.id.toString();

        expect(await providerLogic.updateCoaches({ providerId, coaches: staffUserId }, owner)).to.be
          .true;

        const _provider = await ProviderModel.findById(providerId).populate('coaches');
        expect(_provider).not.to.be.null;
        expect(_provider!.name).to.be.equal(provider.name);
        const _coachesId: string[] = _provider!.coaches.map(coach => (coach as any).id);
        expect(_coachesId).to.deep.equal(staffUserId);
        _provider!.coaches.forEach(coach => userExpectations(coach, true));
      });

      it('should update coaches of a provider with user admin in provider', async () => {
        const owner = await createRandomUser(STAFF_ROLE);
        const provider = await ProviderModel.create({ name, admins: [owner.id] });
        const providerId = provider.id.toString();
        const coachesId = staffUsers.map(coach => coach.id!.toString());

        expect(await providerLogic.updateCoaches({ providerId, coaches: coachesId }, owner)).to.be
          .true;

        const _provider = await ProviderModel.findById(providerId).populate('coaches');
        expect(_provider).not.to.be.null;
        expect(_provider!.name).to.be.equal(provider.name);
        const _coachesId: string[] = _provider!.coaches.map(coach => (coach as any).id);
        expect(_coachesId).to.deep.equal(coachesId);
      });

      it('should fail to update coaches of a provider with owner not SUPERADMIN', async () => {
        const provider = await ProviderModel.create({ name });
        const providerId = provider.id.toString();
        const otherRoles = ROLES.filter(role => role !== SUPERADMIN_ROLE);
        for (let role of otherRoles) {
          const owner = await createRandomUser(role);

          await expect(
            providerLogic.updateCoaches({ providerId, coaches: staffUserId }, owner)
          ).to.be.rejectedWith(AuthorizationError);
        }
      });
    });
  });

  describe('modify customer in a provider', () => {
    let name: string;
    let owner: UserType;
    let provider: Provider;

    beforeEach(async () => {
      name = faker.company.companyName();
      owner = await createRandomUser(STAFF_ROLE);
    });

    describe('add a customer', () => {
      beforeEach(async () => (provider = await ProviderModel.create({ name, admins: [owner.id] })));

      it('should add a new customer to a provider', async () => {
        const newUser = await createRandomUser(USER_ROLE);
        const response = await providerLogic.addCustomer(provider.id.toString(), newUser.id, owner);
        expect(response).to.be.true;
        const _provider = await ProviderModel.findById(provider.id).populate('customers');
        expect(_provider).not.to.be.null;
        expect(_provider!.customers).to.have.lengthOf(1);
        expect(_provider!.customers[0])
          .to.have.property('id')
          .and.to.be.equal(newUser.id);
        userExpectations(_provider!.customers[0], true);
      });

      it('should add a new customer (but not repeat) to a provider', async () => {
        const newUser = await createRandomUser(USER_ROLE);
        let response = await providerLogic.addCustomer(provider.id.toString(), newUser.id, owner);
        expect(response).to.be.true;
        response = await providerLogic.addCustomer(provider.id.toString(), newUser.id, owner);
        expect(response).to.be.true;
        const _provider = await ProviderModel.findById(provider.id).populate('customers');
        expect(_provider).not.to.be.null;
        expect(_provider!.customers).to.have.lengthOf(1);
        expect(_provider!.customers[0])
          .to.have.property('id')
          .and.to.be.equal(newUser.id);
        userExpectations(_provider!.customers[0], true);
      });

      describe('fail cases', () => {
        it('should fail if id of provider is empty', async () => {
          const newUser = await createRandomUser(USER_ROLE);
          await expect(providerLogic.addCustomer('', newUser.id, owner)).to.be.rejectedWith(
            ValidationError,
            'providerId is required'
          );
        });

        it('should fail if id of provider not found', async () => {
          const newUser = await createRandomUser(USER_ROLE);
          const providerId = newUser.id; // wrong id
          await expect(providerLogic.addCustomer(providerId, newUser.id, owner)).to.be.rejectedWith(
            LogicError,
            `Provider with id ${providerId} not found`
          );
        });

        it('should fail if id of user is empty', async () => {
          const newUser = await createRandomUser(USER_ROLE);
          await expect(
            providerLogic.addCustomer(provider.id.toString(), '', owner)
          ).to.be.rejectedWith(ValidationError, 'newUser is required');
        });

        it('should fail if owner is not admin', async () => {
          const owner = await createRandomUser(STAFF_ROLE);
          const newUser = await createRandomUser(USER_ROLE);
          await expect(
            providerLogic.addCustomer(provider.id.toString(), newUser.id, owner)
          ).to.be.rejectedWith(AuthorizationError);
          const _provider = await ProviderModel.findById(provider.id).populate('customers');
          expect(_provider).not.to.be.null;
          expect(_provider!.customers).to.have.lengthOf(0);
        });
      });
    });

    describe('remove a customer', () => {
      let users: UserType[];
      let usersId: string[];

      beforeEach(async () => {
        users = [];
        await fillDbRandomUsers(users, 5, USER_ROLE);
        usersId = users.map(user => user.id!.toString());
        provider = await ProviderModel.create({ name, admins: [owner.id], customers: usersId });
      });

      it('should remove a present customer', async () => {
        const user = random(users);
        const response = await providerLogic.removeCustomer(provider.id.toString(), user.id, owner);
        expect(response).to.be.true;

        const _provider = await ProviderModel.findById(provider.id).populate('customers');
        expect(_provider).not.to.be.null;
        expect(_provider!.customers).to.have.lengthOf(users.length - 1);
      });

      it('should return false if no customer was removed', async () => {
        const user = await createRandomUser(USER_ROLE);
        const response = await providerLogic.removeCustomer(provider.id.toString(), user.id, owner);
        expect(response).to.be.false;

        const _provider = await ProviderModel.findById(provider.id).populate('customers');
        expect(_provider).not.to.be.null;
        expect(_provider!.customers).to.have.lengthOf(users.length);
      });

      describe('fail cases', () => {
        it('should fail if id of provider is empty', async () => {
          const userToRemove = await createRandomUser(USER_ROLE);
          await expect(providerLogic.removeCustomer('', userToRemove.id, owner)).to.be.rejectedWith(
            ValidationError,
            'providerId is required'
          );
        });

        it('should fail if id of provider not found', async () => {
          const userToRemove = await createRandomUser(USER_ROLE);
          const providerId = userToRemove.id; // wrong id
          await expect(
            providerLogic.removeCustomer(providerId, userToRemove.id, owner)
          ).to.be.rejectedWith(LogicError, `Provider with id ${providerId} not found`);
        });

        it('should fail if id of user is empty', async () => {
          await expect(
            providerLogic.removeCustomer(provider.id.toString(), '', owner)
          ).to.be.rejectedWith(ValidationError, 'userToRemove is required');
        });

        it('should fail if owner is not admin', async () => {
          const owner = await createRandomUser(STAFF_ROLE);
          const userToRemove = await createRandomUser(USER_ROLE);
          await expect(
            providerLogic.removeCustomer(provider.id.toString(), userToRemove.id, owner)
          ).to.be.rejectedWith(AuthorizationError);
          const _provider = await ProviderModel.findById(provider.id).populate('customers');
          expect(_provider).not.to.be.null;
          expect(_provider!.customers).to.have.lengthOf(users.length);
        });
      });
    });
  });
});
