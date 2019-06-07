import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { random } from '../utils';
import { ROLES, STAFF_ROLE, SUPERADMIN_ROLE, USER_ROLE } from '../../data/enums';
import {  User, UserModel } from '../../data/models/user';
import { ProviderModel } from '../../data/models/provider';
import { AttendanceModel } from '../../data/models/attendance';
import { SessionModel } from '../../data/models/session';
import { SessionTypeModel } from '../../data/models/session-type';
import { RequestCustomerModel } from './../../data/models/request';

import * as chai from 'chai';
import faker = require('faker');
const { expect } = chai;

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
  await RequestCustomerModel.deleteMany({});
}

export function randomUser(_role?: string) {
  const name = faker.name.firstName();
  const surname = faker.name.lastName();
  const email = faker.internet.email();
  const password = faker.internet.password();
  const role = _role || (random(ROLES) as string);
  const phone = faker.phone.phoneNumber();
  return { name, surname, email, password, role, phone };
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
  admin.adminOf = [provider.id]
  admin.save();
  for (let customer of customers) {
    await UserModel.findByIdAndUpdate(customer.id, {customerOf : [provider.id]});
  }
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
  expect(user)
    .to.have.property('phone')
    .and.be.a('string');
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
