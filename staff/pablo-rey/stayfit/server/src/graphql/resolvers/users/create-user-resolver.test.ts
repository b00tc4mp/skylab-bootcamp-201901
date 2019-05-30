import { gql } from 'apollo-server';
import { compare } from 'bcryptjs';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { randomUser } from '../../../common/test-utils';
import { GUEST_ROLE, UserModel, SUPERADMIN_ROLE, ROLES } from '../../../models/user';
import { gCall } from '../../../utils/testing-utils/gqlCall';
import { expectError } from './../../../utils/testing-utils/error-handling';
import sinon = require('sinon');

chai.use(chaiAsPromised);
const { expect } = chai;

dotenv.config();
const {
  env: { MONGODB_URL_TESTING },
} = process;

describe('create users', function() {
  before(() => mongoose.connect(MONGODB_URL_TESTING!, { useNewUrlParser: true }));
  after(async () => await mongoose.disconnect());
  this.timeout(5000);

  const mutation = gql`
    mutation Register($name: String!, $surname: String!, $email: String!, $password: String!, $role: String!) {
      createUser(data: { name: $name, surname: $surname, email: $email, password: $password, role: $role })
    }
  `;

  let name: string, surname: string, email: string, password: string, role: string;

  beforeEach(async () => {
    await UserModel.deleteMany({});
  });

  beforeEach(() => {
    const user = randomUser();
    name = user.name;
    surname = user.surname;
    email = user.email;
    password = user.password!;
    role = user.role;
  });

  it('should register a guest user without provide any owner correct data', async () => {
    role = GUEST_ROLE;

    const response = await gCall({
      source: mutation,
      variableValues: {
        name,
        surname,
        email,
        password,
        role,
      },
    });
    if (response.errors) console.log(response.errors);
    expect(response).not.to.have.property('errors');
    expect(response).to.have.property('data');
    expect(response.data!.createUser).to.be.a('string');
    const _id = response.data!.createUser;

    const _users = await UserModel.find();
    expect(_users).to.have.lengthOf(1);

    const _user = _users[0];
    expect(_user.id.toString()).to.be.equal(_id);
    expect(_user.name).to.be.equal(name);
    expect(_user.surname).to.be.equal(surname);
    expect(_user.email).to.be.equal(email);
    expect(_user.role).to.be.equal(role);
    expect(await compare(password, _user.password)).to.be.true;
  });

  it('should fail to register an user with same email', async () => {
    role = GUEST_ROLE;
    await UserModel.create({ name, surname, email, password, role });
    const response = await gCall({
      source: mutation,
      variableValues: {
        name,
        surname,
        email,
        password,
        role,
      },
    });
    expectError(response, 'Error', 'email already registered');
    const _users = await UserModel.find({ email });
    expect(_users).to.have.lengthOf(1);
  });

  // describe('authorization failures', () => {
  //   it('should register any type of user if the owner has SUPERADMIN_ROLE ', async () => {
  //     const owner = await UserModel.create(randomUser(SUPERADMIN_ROLE));
  //     for (let role of ROLES) {
  //       const user = randomUser(role);
  //       const response = await gCall({
  //         source: mutation,
  //         variableValues: {
  //           name: user.name,
  //           surname: user.surname,
  //           email: user.email,
  //           password: user.password,
  //           role,
  //         },
  //         contextUserId: owner.id,
  //       });
  //       if (response.errors) console.log(response.errors);
  //       expect(response).not.to.have.property('errors');
  //       expect(response).to.have.property('data');
  //       expect(response.data!.createUser).to.be.a('string');
  //       const _id = response.data!.createUser;
  //       expect(await UserModel.findById(_id)).not.to.be.null;
  //     }
  //   });

  //   it('should register correct types of users the owner has BUSINESS_ROLE', async () => {
  //     const owner = await UserModel.create(randomUser(BUSINESS_ROLE));
  //     for (let role of [ADMIN_ROLE, STAFF_ROLE, GUEST_ROLE, USER_ROLE]) {
  //       const newUser = await usersLogic.create(randomUser(role), owner);
  //       expect(newUser).not.to.be.undefined;
  //       userExpectations(newUser);
  //     }
  //     for (let role of [SUPERADMIN_ROLE, BUSINESS_ROLE]) {
  //       const failUser = randomUser(SUPERADMIN_ROLE);
  //       await expect(usersLogic.create(failUser, owner)).to.be.rejectedWith(
  //         AuthorizationError,
  //         'Not authorized to create a user with ' + failUser.role
  //       );
  //     }
  //   });

  //   it('should register correct types of users the owner has ADMIN_ROLE', async () => {
  //     const owner = await UserModel.create(randomUser(ADMIN_ROLE));
  //     for (let role of [STAFF_ROLE, GUEST_ROLE, USER_ROLE]) {
  //       const newUser = await usersLogic.create(randomUser(role), owner);
  //       expect(newUser).not.to.be.undefined;
  //       userExpectations(newUser);
  //     }
  //     for (let role of [SUPERADMIN_ROLE, BUSINESS_ROLE, ADMIN_ROLE]) {
  //       const failUser = randomUser(SUPERADMIN_ROLE);
  //       await expect(usersLogic.create(failUser, owner)).to.be.rejectedWith(
  //         AuthorizationError,
  //         'Not authorized to create a user with ' + failUser.role
  //       );
  //     }
  //   });

  //   it('should register correct types of users the owner has STAFF_ROLE', async () => {
  //     const owner = await UserModel.create(randomUser(STAFF_ROLE));
  //     for (let role of [GUEST_ROLE, USER_ROLE]) {
  //       const newUser = await usersLogic.create(randomUser(role), owner);
  //       expect(newUser).not.to.be.undefined;
  //       userExpectations(newUser);
  //     }
  //     for (let role of [SUPERADMIN_ROLE, BUSINESS_ROLE, ADMIN_ROLE, STAFF_ROLE]) {
  //       const failUser = randomUser(SUPERADMIN_ROLE);
  //       await expect(usersLogic.create(failUser, owner)).to.be.rejectedWith(
  //         AuthorizationError,
  //         'Not authorized to create a user with ' + failUser.role
  //       );
  //     }
  //   });
  // });

  // })
});
