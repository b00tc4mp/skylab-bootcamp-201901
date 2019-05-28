import * as bcrypt from 'bcryptjs';
import { expect } from 'chai';
import * as faker from 'faker';
import * as mongoose from 'mongoose';
import { ROLES, UserModel, UserType } from '../../models/user';
import { random } from '../../utils/random';

const { ObjectId } = mongoose.Types;

export function randomUser(_role?: string): UserType {
  const name = faker.name.firstName();
  const surname = faker.name.lastName();
  const email = faker.internet.email();
  const password = faker.internet.password();
  const role = _role || random(ROLES);
  return { name, surname, email, password, role };
}

export function createRandomUser(_role?: string) {
  return UserModel.create(randomUser(_role));
}

export async function fillDbRandomUsers(users: UserType[] = [], num: number = 10, role?: string) {
  for (let ii = 0, ll = Math.max(random(num), 1); ii < ll; ii++) {
    const user = randomUser(role);
    const hashPassword = await bcrypt.hash(user.password!, 12);
    const dbUser = await UserModel.create({ ...user, password: hashPassword });
    users.push(dbUser);
  }
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
