import * as dotenv from 'dotenv';
import * as chai from 'chai';
import * as mongoose from 'mongoose';
import { SUPERADMIN_ROLE, USER_ROLE, ADMIN_ROLE } from './../../data/enums';
import { ALWAYS_OWN_USER, authChecker, ONLY_SUPERADMIN, ONLY_OWN_USER, ALWAYS_OWN_CUSTOMER, ONLY_IF_MY_CUSTOMER, ONLY_ADMINS_OF_PROVIDER } from './authChecker';
import { ProviderModel } from './../../data/models/provider';
import { createRandomUser } from '../tests-utils';
const { expect } = chai;

dotenv.config();
const {
  env: { MONGODB_URL_TESTING },
} = process;

describe('authChecker', function() {
  this.timeout(10000);

  before(() => mongoose.connect(MONGODB_URL_TESTING!, { useNewUrlParser: true }));
  after(async () => await mongoose.disconnect());

  it('should fail if empty id is provided', () => {
    try {
      authChecker(
        {
          root: {} as any,
          args: {},
          context: { userId: '', role: SUPERADMIN_ROLE, req: {} as any, res: {} as any },
          info: {} as any,
        },
        []
      );
      expect(() => 'authChecker').to.throw();
    } catch (error) {
      expect(error).to.exist;
    }
  });
  it('should fail if no role is provided', () => {
    try {
      authChecker(
        {
          root: {} as any,
          args: {},
          context: { userId: 'test', role: '', req: {} as any, res: {} as any },
          info: {} as any,
        },
        [ONLY_SUPERADMIN]
      );
      expect(() => 'authChecker').to.throw();
    } catch (error) {
      expect(error).to.exist;
    }
  });
  it('should fail if any other role is provided but ONLY_SUPERADMIN is required', () => {
    try {
      authChecker(
        {
          root: {} as any,
          args: {},
          context: { userId: 'test', role: ADMIN_ROLE, req: {} as any, res: {} as any },
          info: {} as any,
        },
        [ONLY_SUPERADMIN]
      );
      expect(() => 'authChecker').to.throw();
    } catch (error) {
      expect(error).to.exist;
    }
  });
  it('should fail if any not is user the owner of request', () => {
    try {
      authChecker(
        {
          root: {} as any,
          args: { userId: 'not-user'},
          context: { userId: 'test', role: ADMIN_ROLE, req: {} as any, res: {} as any },
          info: {} as any,
        },
        [ONLY_OWN_USER]
      );
      expect(() => 'authChecker').to.throw();
    } catch (error) {
      expect(error).to.exist;
    }
  });
  it('should grant if SUPERADMIN_ROLE is provided', () => {
    try {
      authChecker(
        {
          root: {} as any,
          args: {},
          context: { userId: 'test', role: SUPERADMIN_ROLE, req: {} as any, res: {} as any },
          info: {} as any,
        },
        [ONLY_SUPERADMIN]
      );
      expect(() => 'authChecker').not.to.throw();
    } catch (error) {
      expect(error).not.to.exist;
    }
  });
  it('should grant if ALWAYS_OWN_USER and the query is about this user is provided', () => {
    try {
      authChecker(
        {
          root: {} as any,
          args: { userId: 'test' },
          context: { userId: 'test', role: USER_ROLE, req: {} as any, res: {} as any },
          info: {} as any,
        },
        [ALWAYS_OWN_USER]
      );
      expect(() => 'authChecker').not.to.throw();
    } catch (error) {
      expect(error).not.to.exist;
    }
  });
  it('should grant if ALWAYS_OWN_CUSTOMER and the query is about this user is provided', async () => {
    const user = await createRandomUser(USER_ROLE)
    const admin = await createRandomUser(ADMIN_ROLE)
    const provider = await ProviderModel.create({name:'test', admins:[admin], customers: [user]});
    admin.adminOf = [provider];
    await admin.save();
    user.customerOf = [provider];
    await user.save();
    
    try {
      const result = await authChecker(
        {
          root: {} as any,
          args: { userId: user.id },
          context: { userId: admin.id, role: admin.role, req: {} as any, res: {} as any },
          info: {} as any,
        },
        [ALWAYS_OWN_CUSTOMER]
      );
      expect(result).to.be.true;
    } catch (error) {
      expect(error).not.to.exist;
    }
  });
  it('should grant if ALWAYS_OWN_CUSTOMER and the query is about this user is provided', async () => {
    const user = await createRandomUser(USER_ROLE)
    const admin = await createRandomUser(ADMIN_ROLE)
    const provider = await ProviderModel.create({name:'test', admins:[admin], customers: [user]});
    admin.adminOf = [provider];
    await admin.save();
    user.customerOf = [provider];
    await user.save();
    
    try {
      const result = await authChecker(
        {
          root: {} as any,
          args: { data: {userId: user.id} },
          context: { userId: admin.id, role: admin.role, req: {} as any, res: {} as any },
          info: {} as any,
        },
        [ALWAYS_OWN_CUSTOMER]
      );
      expect(result).to.be.true;
    } catch (error) {
      expect(error).not.to.exist;
    }
  });
  it('should fail if ALWAYS_OWN_CUSTOMER and the query dont provide target user', async () => {
    const user = await createRandomUser(USER_ROLE)
    const admin = await createRandomUser(ADMIN_ROLE)
    const provider = await ProviderModel.create({name:'test', admins:[admin], customers: [user]});
    admin.adminOf = [provider];
    await admin.save();
    user.customerOf = [provider];
    await user.save();
    
    try {
      const result = await authChecker(
        {
          root: {} as any,
          args: {},
          context: { userId: admin.id, role: admin.role, req: {} as any, res: {} as any },
          info: {} as any,
        },
        [ALWAYS_OWN_CUSTOMER]
      );
      expect(result).to.be.false;
    } catch (error) {
      expect(error).to.exist;
    }
  });

  it('should fail if ONLY_IF_MY_CUSTOMER and the target user is not my customer', async () => {
    const user = await createRandomUser(USER_ROLE)
    const user2 = await createRandomUser(USER_ROLE);
    const admin = await createRandomUser(ADMIN_ROLE)
    const provider = await ProviderModel.create({name:'test', admins:[admin], customers: [user]});
    admin.adminOf = [provider];
    await admin.save();
    user.customerOf = [provider];
    await user.save();
    
    try {
      const result = await authChecker(
        {
          root: {} as any,
          args: { userId: user2.id},
          context: { userId: admin.id, role: admin.role, req: {} as any, res: {} as any },
          info: {} as any,
        },
        [ONLY_IF_MY_CUSTOMER]
      );
      expect(result).to.be.false;
    } catch (error) {
      expect(error).to.exist;
    }
  });
  it('should fail if ONLY_IF_MY_CUSTOMER and the target user is not provided', async () => {
    const user = await createRandomUser(USER_ROLE)
    const admin = await createRandomUser(ADMIN_ROLE)
    const provider = await ProviderModel.create({name:'test', admins:[admin], customers: [user]});
    admin.adminOf = [provider];
    await admin.save();
    user.customerOf = [provider];
    await user.save();
    
    try {
      const result = await authChecker(
        {
          root: {} as any,
          args: {},
          context: { userId: admin.id, role: admin.role, req: {} as any, res: {} as any },
          info: {} as any,
        },
        [ONLY_IF_MY_CUSTOMER]
      );
      expect(result).to.be.false;
    } catch (error) {
      expect(error).to.exist;
    }
  });
  it('should fail if ONLY_ADMINS_OF_PROVIDER and the target user is not admin', async () => {
    const user = await createRandomUser(USER_ROLE)
    const admin = await createRandomUser(ADMIN_ROLE)
    const provider = await ProviderModel.create({name:'test', admins:[admin], customers: [user]});
    admin.adminOf = [provider];
    await admin.save();
    user.customerOf = [provider];
    await user.save();
    
    try {
      const result = await authChecker(
        {
          root: {} as any,
          args: { providerId: provider.id},
          context: { userId: user.id, role: user.role, req: {} as any, res: {} as any },
          info: {} as any,
        },
        [ONLY_ADMINS_OF_PROVIDER]
      );
      expect(result).to.be.false;
    } catch (error) {
      expect(error).to.exist;
    }
  });
  it('should fail if ONLY_ADMINS_OF_PROVIDER and providerId is given', async () => {
    const user = await createRandomUser(USER_ROLE)
    const admin = await createRandomUser(ADMIN_ROLE)
    const provider = await ProviderModel.create({name:'test', admins:[admin], customers: [user]});
    admin.adminOf = [provider];
    await admin.save();
    user.customerOf = [provider];
    await user.save();
    
    try {
      const result = await authChecker(
        {
          root: {} as any,
          args: {},
          context: { userId: user.id, role: user.role, req: {} as any, res: {} as any },
          info: {} as any,
        },
        [ONLY_ADMINS_OF_PROVIDER]
      );
      expect(result).to.be.false;
    } catch (error) {
      expect(error).to.exist;
    }
  });
});
