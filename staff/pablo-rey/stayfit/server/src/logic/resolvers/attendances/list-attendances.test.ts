import { gCall } from '../../../common/test-utils/gqlCall';
import { PAIDINADVANCE, CONFIRMED, AttendanceModel, TOPAYINSESSION, NOSHOW, Attendance } from '../../../data/models/attendance';
import { USER_ROLE, SUPERADMIN_ROLE, User } from '../../../data/models/user';
import { ACTIVE, PUBLIC, SessionModel, Session } from '../../../data/models/session';
import { gql } from 'apollo-server';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { SessionTypeModel } from '../../../data/models/session-type';
import { createRandomUser } from '../../tests-utils';
import { deleteModels, createTestProvider } from '../../../common/test-utils';

chai.use(chaiAsPromised);
const { expect } = chai;

dotenv.config();
const {
  env: { MONGODB_URL_TESTING },
} = process;

describe('list my attendances', function() {
  before(() => mongoose.connect(MONGODB_URL_TESTING!, { useNewUrlParser: true }));
  after(async () => await mongoose.disconnect());

  async function createDummySession() {
    const { provider, coaches } = await createTestProvider({});
    const type = await SessionTypeModel.findOne({ type: 'wod', provider });
    const title = 'Test session';
    const startTime = new Date();
    const endTime = new Date();
    const maxAttendants = 10;
    const status = ACTIVE;
    const visibility = PUBLIC;

    const data = {
      title,
      provider,
      coaches,
      startTime,
      endTime,
      maxAttendants,
      type,
      attendances: [],
      status,
      visibility,
    };
    const session = await SessionModel.create(data);
    return session;
  }

});
