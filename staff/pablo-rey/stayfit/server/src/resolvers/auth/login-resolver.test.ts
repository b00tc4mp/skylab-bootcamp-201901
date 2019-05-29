import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { UserModel, User } from '../../models/user';
import { random } from '../../utils/random';
import { fillDbRandomUsers } from './../../common/test-utils';
import { gCall } from './../../utils/testing-utils/gqlCall';
import { gql } from 'apollo-server';

chai.use(chaiAsPromised);
const { expect } = chai;

dotenv.config();
const {
  env: { MONGODB_URL_TESTING },
} = process;

describe('login user', function() {
  before(() => mongoose.connect(MONGODB_URL_TESTING!, { useNewUrlParser: true }));
  after(async () => await mongoose.disconnect());
  this.timeout(5000);

  const loginMutation = gql`
    mutation Register($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
      }
    }
  `;

  let users: User[];
  let email: string, password: string;
  let _user: User;

  beforeEach(async () => {
    await UserModel.deleteMany({});
    users = [];
    await fillDbRandomUsers(users);
    _user = random(users);
    email = _user.email;
    password = _user.password!;
  });

  it.only('should login correct a random user', async () => {
    debugger;

    const response = await gCall({
      source: loginMutation,
      variableValues: {
        email,
        password,
      },
    });
    expect(response).not.to.have.property('errors');
    expect(response).to.have.property('data');
    const { login } = response.data as any;
    expect('login').not.to.be.undefined;
    const { token } = login;
    const decodedToken = await jwt.decode(token);
    expect(decodedToken)
      .to.have.property('sub')
      .to.be.equal(_user.id);

    const now = new Date().getTime() / 1000;
    expect(decodedToken)
      .to.have.property('iat')
      .to.be.closeTo(now, 20);
    const exp = now + 60 * 60; // 60 minutes
    expect(decodedToken)
      .to.have.property('exp')
      .to.be.closeTo(exp, 20);

    // expect(response).toMatchObject({
    //   data: {
    //     register: {
    //       firstName: user.firstName,
    //       lastName: user.lastName,
    //       email: user.email,
    //     },
    //   },
    // });

    // const user = await usersLogic.login(email, password);
    // expect(user).not.to.be.null;
    // expect(user.id).to.be.equal(_user.id);
    // expect(user.role).to.be.equal(_user.role);
  });

  // it('should fail if email does not exists', async () => {
  //   await UserModel.findByIdAndDelete(_user.id);
  //   expect(usersLogic.login(email, password)).to.be.rejectedWith(AuthenticationError, 'wrong credentials');
  // });

  // describe('params bad format', () => {
  //   it('should fail if email is empty', async () => {
  //     await expect(usersLogic.login('', password)).to.be.rejectedWith(ValidationError, 'email is required');
  //   });
  //   it('should fail if email provided is not a valid formated email', async () => {
  //     await expect(usersLogic.login(faker.random.alphaNumeric(), password)).to.be.rejectedWith(
  //       ValidationError,
  //       'email not contains a valid email'
  //     );
  //   });
  //   it('should fail if password is empty', async () => {
  //     await expect(usersLogic.login(email, '')).to.be.rejectedWith(ValidationError, 'password is required');
  //   });
  // });
});
