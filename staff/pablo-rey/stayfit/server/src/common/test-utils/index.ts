import { AttendanceModel } from './../../models/attendance';
import * as bcrypt from 'bcryptjs';
import { expect } from 'chai';
import * as faker from 'faker';
import * as mongoose from 'mongoose';
import { ROLES, UserModel, User, SUPERADMIN_ROLE, STAFF_ROLE, USER_ROLE } from '../../models/user';
import { random } from '../../utils/random';
import { SessionModel } from './../../models/session';
import { SessionTypeModel } from './../../models/session-type';
import { ProviderModel } from '../../models/provider';

const { ObjectId } = mongoose.Types;

export type userAndPlainPassword = {
  user: User;
  password?: string;
};

export async function deleteModels() {
  await UserModel.deleteMany({});
  await ProviderModel.deleteMany({});
  await SessionModel.deleteMany({});
  await SessionTypeModel.deleteMany({});
  await AttendanceModel.deleteMany({});
}

export function randomUser(_role?: string) {
  const name = faker.name.firstName();
  const surname = faker.name.lastName();
  const email = faker.internet.email();
  const password = faker.internet.password();
  const role = _role || (random(ROLES) as string);
  return { name, surname, email, password, role };
}

export function createRandomUser(_role?: string) {
  return UserModel.create(randomUser(_role));
}

export async function fillDbRandomUsers(users: userAndPlainPassword[] = [], maxUsers: number = 10, role?: string) {
  for (let ii = 0, ll = Math.max(random(maxUsers), 1); ii < ll; ii++) {
    const user = randomUser(role);
    const hashPassword = await bcrypt.hash(user.password!, 12);
    const dbUser = await UserModel.create({ ...user, password: hashPassword });
    users.push({ user: dbUser, password: user.password });
  }
}

export async function createTestProvider({
  maxCoaches = 5,
  maxCustomers = 15,
}: {
  maxCoaches?: number;
  maxCustomers?: number;
}) {
  const name = faker.company.companyName();
  const superadmin = await createRandomUser(SUPERADMIN_ROLE);
  const admin = await createRandomUser(STAFF_ROLE);
  const coachesUserPassword: userAndPlainPassword[] = [];
  await fillDbRandomUsers(coachesUserPassword, maxCoaches, STAFF_ROLE);
  const coaches = coachesUserPassword.map(up => up.user);
  const coachesId = coachesUserPassword.map(up => up.user.id!.toString());
  const customersUserPassword: userAndPlainPassword[] = [];
  await fillDbRandomUsers(customersUserPassword, maxCustomers, USER_ROLE);
  const customers = customersUserPassword.map(up => up.user);
  const customersId = customersUserPassword.map(up => up.user.id!.toString());
  const provider = await ProviderModel.create({ name, admins: [admin], coaches, customers });
  await SessionTypeModel.create({ type: 'wod', title: 'WOD', active: true, provider });
  await SessionTypeModel.create({ type: 'ob', title: 'Open Box', active: true, provider });
  await SessionTypeModel.create({ type: 'pt', title: 'Personal training', active: true, provider });
  return {
    name,
    superadmin,
    admin,
    coachesUserPassword,
    coaches,
    coachesId,
    customersUserPassword,
    customers,
    customersId,
    provider,
  };
}

export function userExpectations(user: any, withPassword: boolean = false): void {
  expect(user).not.to.be.undefined;
  expect(user)
    .to.have.property('id')
    .and.be.a('string');
  expect(user)
    .to.have.property('_id')
    .and.be.instanceOf(mongoose.Types.ObjectId);
  expect(user)
    .to.have.property('name')
    .and.be.a('string');
  expect(user)
    .to.have.property('surname')
    .and.be.a('string');
  expect(user)
    .to.have.property('email')
    .and.be.a('string');
  if (withPassword) expect(user).to.have.property('password');
  else expect(user).not.to.have.property('password');
  expect(user)
    .to.have.property('role')
    .and.be.a('string')
    .and.to.be.oneOf(ROLES);
}

export function providerExpectations(provider: any): void {
  expect(provider).not.to.be.undefined;
  expect(provider).to.have.property('name');
  expect(provider)
    .to.have.property('admins')
    .and.be.instanceOf(Array);
  if (provider.admins.length) {
    expect(
      provider.admins.every((admin: any) => {
        if (admin instanceof ObjectId) return true;
        userExpectations(admin);
        return true;
      })
    ).to.be.true;
  }
  expect(provider)
    .to.have.property('coaches')
    .and.be.instanceOf(Array);
  if (provider.coaches.length) {
    expect(
      provider.coaches.every((coach: any) => {
        if (coach instanceof ObjectId) return true;
        userExpectations(coach);
        return true;
      })
    ).to.be.true;
  }
  expect(provider)
    .to.have.property('customers')
    .and.be.instanceOf(Array);
  if (provider.customers.length) {
    expect(
      provider.customers.every((customers: any) => {
        if (customers instanceof ObjectId) return true;
        userExpectations(customers);
        return true;
      })
    ).to.be.true;
  }
}

export async function cleanDb() {
  await UserModel.deleteMany({});
  await SessionModel.deleteMany({});
  await SessionTypeModel.deleteMany({});
  await SessionTypeModel.create({ type: 'wod', title: 'WOD' });
  await SessionTypeModel.create({ type: 'pt', title: 'Personal training' });
}
