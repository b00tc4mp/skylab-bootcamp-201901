import { gql } from 'apollo-server';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as dotenv from 'dotenv';
import * as moment from 'moment';
import * as mongoose from 'mongoose';
import { gCall } from '../../../../common/test-utils/gqlCall';
import { random } from '../../../../common/utils';
import { ACTIVE, PUBLIC, SessionModel } from '../../../../data/models/session';
import { SessionTypeModel } from '../../../../data/models/session-type';
import { createTestProvider, deleteModels } from '../../../../common/test-utils';

chai.use(chaiAsPromised);
const { expect } = chai;

dotenv.config();
const {
  env: { MONGODB_URL_TESTING },
} = process;

describe('list sessions for users', function() {
  before(() => mongoose.connect(MONGODB_URL_TESTING!, { useNewUrlParser: true }));
  after(async () => await mongoose.disconnect());

  it('list sessions and attendances for user')
});