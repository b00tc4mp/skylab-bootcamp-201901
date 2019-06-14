import { gql } from 'apollo-server';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as dotenv from 'dotenv';
import * as moment from 'moment';
import * as mongoose from 'mongoose';
import { random } from '../../../../common/utils';
import { ADMIN_ROLE, USER_ROLE, STAFF_ROLE, PUBLIC, ACTIVE, PAIDINADVANCE, OK } from '../../../../data/enums';
import { User, UserModel } from '../../../../data/models/user';
import { Provider, ProviderModel } from '../../../../data/models/provider';
import { SessionTypeModel } from '../../../../data/models/session-type';
import { Session, SessionModel } from '../../../../data/models/session';
import { Attendance, AttendanceModel } from '../../../../data/models/attendance';
import { gCall } from '../../../../common/test-utils/gqlCall';
import { createRandomUser, deleteModels } from '../../../../common/test-utils';

chai.use(chaiAsPromised);
const { expect } = chai;

dotenv.config();
const {
  env: { MONGODB_URL_TESTING },
} = process;

describe('list sessions', function() {
  this.timeout(15000);
  before(() => mongoose.connect(MONGODB_URL_TESTING!, { useNewUrlParser: true }));
  after(async () => await mongoose.disconnect());

  let admin: User;
  let coach: User;
  let customer: User;
  let provider: Provider;
  let sessions: Session[] = [];
  let attendances: Attendance[] = [];

  beforeEach(async () => {
    await deleteModels();
    sessions = [];
    attendances = [];
    admin = await createRandomUser(ADMIN_ROLE);
    coach = await createRandomUser(STAFF_ROLE);
    customer = await createRandomUser(USER_ROLE);
    provider = await ProviderModel.create({ name: 'test', admins: [admin], coaches: [coach], customers: [customer] });
    await UserModel.findByIdAndUpdate(admin.id, { adminOf: [provider] });
    await UserModel.findByIdAndUpdate(customer.id, { customerOf: [provider] });
    const type = await SessionTypeModel.create({ type: 'test', provider, title: 'test' });
    for (let ii = 0, ll = random(10) + 5; ii < ll; ii++) {
      sessions.push(
        await SessionModel.create({
          title: 'test',
          provider,
          coaches: [coach],
          maxAttendants: 10,
          startTime: new Date(),
          endTime: new Date(),
          type,
          visibility: PUBLIC,
          status: ACTIVE,
          attendanceDefaultStatus: OK,
          attendances: [],
        })
      );
    }
    for (let ii = 0, ll = Math.max(2, random(sessions.length)); ii < ll; ii++) {
      const attendance = await AttendanceModel.create({
        user: customer,
        session: sessions[ii],
        paymentType: PAIDINADVANCE,
        status: OK,
      });
      sessions[ii].attendances = [attendance];
      await SessionModel.findByIdAndUpdate(sessions[ii].id, { attendances: [attendance] });
      attendances.push(attendance);
    }
  });

  describe('list session for users', () => {
    const query = gql`
      query ListSessions($providerId: String!, $day: String!) {
        listMyAvailableSessions(providerId: $providerId, day: $day) {
          session {
            id
            title
            coaches {
              name
            }
            startTime
            endTime
            maxAttendants
            type {
              title
            }
            status
          }
          myAttendance {
            id
            status
          }
        }
      }
    `;

    it('list sessions and attendances for user', async () => {
      const res = await gCall({
        source: query,
        variableValues: {
          providerId: provider.id,
          day: moment().format('YYYY-MM-DD'),
        },
        ctx: {
          userId: customer.id.toString(),
          role: customer.role,
        },
      });
      if (res.errors) console.log(res.errors);
      expect(res.errors).not.to.exist;
      expect(res.data).to.exist;
      const data = res.data!.listMyAvailableSessions;

      expect(data)
        .to.be.an.instanceOf(Array)
        .to.have.lengthOf(sessions.length);
      expect(data.filter((s: any) => !!s.myAttendance)).to.have.lengthOf(attendances.length);
      expect(data[0].session.title).to.exist;
      expect(data[0].session.coaches[0].name).to.exist;
      expect(data[0].session.type.title).to.exist;
    });
  });

  describe('list session for admins of provider', () => {
    const query = gql`
      query ListSessions($providerId: String!, $day: String!) {
        listSessions(providerId: $providerId, day: $day) {
          id
          title
          coaches {
            id
            name
          }
          startTime
          endTime
          maxAttendants
          type {
            id
            title
          }
          attendanceDefaultStatus
          attendances {
            id
            user {
              id
              name
            }
            paymentType
            status
          }
        }
      }
    `;

    it('list sessions and attendances for admin', async () => {
      const response = await gCall({
        source: query,
        variableValues: {
          providerId: provider.id,
          day: moment().format('YYYY-MM-DD'),
        },
        ctx: {
          userId: admin.id.toString(),
          role: admin.role,
        },
      });
      if (response.errors) console.log(response.errors);
      expect(response.errors).not.to.exist;
    });
  });

  describe('retrieve a session', () => {
    const query = gql`
      query RetrieveSession($sessionId: String!, $providerId: String!) {
        retrieveSession(sessionId: $sessionId, providerId: $providerId) {
          id
          title
          coaches {
            id
            name
          }
          startTime
          endTime
          maxAttendants
          status
          visibility
          notes
          type {
            id
            title
          }
          attendanceDefaultStatus
          attendances {
            id
            user {
              id
              name
            }
            paymentType
            status
          }
        }
      }
    `;

    it('retrieve a session', async () => {
      const response = await gCall({
        source: query,
        variableValues: {
          sessionId: sessions[0].id,
          providerId: provider.id,
        },
        ctx: {
          userId: admin.id.toString(),
          role: admin.role,
        },
      });
      if (response.errors) console.log(response.errors);
      expect(response.errors).not.to.exist;
      expect(response.data).to.exist;
      const result = response.data!.retrieveSession;
      expect(response).to.exist;
      const session = sessions[0];
      expect(result!.id).to.be.equal(session.id)
      expect(result!.title).to.be.equal(session.title)
      expect(result!.attendances).to.be.instanceOf(Array);
    });

    it('should failt to retrieve a session of a different provider', async () => {
      const admin2 = await createRandomUser(ADMIN_ROLE);
      const provider2 = await ProviderModel.create({name:"test", admins:[admin2]});
      const response = await gCall({
        source: query,
        variableValues: {
          sessionId: sessions[0].id,
          providerId: provider2.id,
        },
        ctx: {
          userId: admin2.id.toString(),
          role: admin2.role,
        },
      });
      expect(response.errors).to.exist;
      expect(response.data).not.to.exist;

    });
  });
});
