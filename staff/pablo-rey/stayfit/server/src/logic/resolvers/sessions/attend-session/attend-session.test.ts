import { gCall } from '../../../../common/test-utils/gqlCall';
import { PAIDINADVANCE, CONFIRMEDBYPROVIDER, AttendanceModel, TOPAYINSESSION, NOSHOW, Attendance } from '../../../../data/models/attendance';
import { USER_ROLE, SUPERADMIN_ROLE, User } from '../../../../data/models/user';
import { ACTIVE, PUBLIC, SessionModel, Session } from '../../../../data/models/session';
import { gql } from 'apollo-server';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { SessionTypeModel } from '../../../../data/models/session-type';
import { createRandomUser } from '../../../tests-utils';
import { deleteModels, createTestProvider } from '../../../../common/test-utils';

chai.use(chaiAsPromised);
const { expect } = chai;

dotenv.config();
const {
  env: { MONGODB_URL_TESTING },
} = process;

describe('attend/unattend session', function() {
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

  describe('attend session', function() {
    this.timeout(5000);
    beforeEach(() => deleteModels());

    const mutation = gql`
      mutation AttendSession($data: AttendanceInput!) {
        attendSession(data: $data)
      }
    `;

    it('should correct annotate the attend session with correct data ', async () => {
      const superadmin = await createRandomUser(SUPERADMIN_ROLE);
      const session = await createDummySession();
      const user = await createRandomUser(USER_ROLE);
      const data = {
        userId: user.id,
        sessionId: session.id,
        paymentType: PAIDINADVANCE,
        status: CONFIRMEDBYPROVIDER,
      };
      const response = await gCall({
        source: mutation,
        variableValues: {
          data,
        },
        ctx: {
          userId: superadmin.id,
          role: superadmin.role,
        },
      });
      if (response.errors) console.log(response.errors);
      expect(response.errors).not.to.exist;
      expect(response).to.have.property('data').and.not.to.be.null;
      const attendanceId = response.data!.attendSession;
      const _attendance = await AttendanceModel.findById(attendanceId);
      expect(_attendance).not.to.be.null;
      expect(_attendance!.user.toString()).to.be.equal(user.id);
      expect(_attendance!.session.toString()).to.be.equal(session.id);
      expect(_attendance!.paymentType).to.be.equal(PAIDINADVANCE);
      expect(_attendance!.status).to.be.equal(CONFIRMEDBYPROVIDER);
      const _session = await SessionModel.findById(session.id);
      expect(_session).not.to.be.null;
      expect(_session!.attendances).to.have.lengthOf(1);
      expect(_session!.attendances[0].toString()).to.be.equal(_attendance!.id);
    });

    it('should not alter the attention if user if already subscribed', async () => {
      const superadmin = await createRandomUser(SUPERADMIN_ROLE);
      const session = await createDummySession();
      const user = await createRandomUser(USER_ROLE);
      const data = {
        userId: user.id,
        sessionId: session.id,
        paymentType: PAIDINADVANCE,
        status: CONFIRMEDBYPROVIDER,
      };
      // create first
      let response = await gCall({
        source: mutation,
        variableValues: {
          data,
        },
        ctx: {
          userId: superadmin.id,
          role: superadmin.role,
        },
      });
      if (response.errors) console.log(response.errors);
      expect(response.errors).not.to.exist;
      expect(response).to.have.property('data').and.not.to.be.null;
      const attendanceId = response.data!.attendSession;

      // create second
      response = await gCall({
        source: mutation,
        variableValues: {
          data,
        },
        ctx: {
          userId: superadmin.id,
          role: superadmin.role,
        },
      });
      if (response.errors) console.log(response.errors);
      expect(response.errors).not.to.exist;
      expect(response).to.have.property('data').and.not.to.be.null;
      const attendanceId2 = response.data!.attendSession;
      expect(attendanceId2).to.be.equal(attendanceId);
      const _attendance = await AttendanceModel.findById(attendanceId);
      expect(_attendance).not.to.be.null;
      expect(_attendance!.user.toString()).to.be.equal(user.id);
      expect(_attendance!.session.toString()).to.be.equal(session.id);
      expect(_attendance!.paymentType).to.be.equal(PAIDINADVANCE);
      expect(_attendance!.status).to.be.equal(CONFIRMEDBYPROVIDER);
      const _session = await SessionModel.findById(session.id);
      expect(_session).not.to.be.null;
      expect(_session!.attendances).to.have.lengthOf(1);
      expect(_session!.attendances[0].toString()).to.be.equal(_attendance!.id);
    });
  });

  describe('attend session', function() {
    this.timeout(10000);
    beforeEach(() => deleteModels());
    
    let superadmin: User;
    let session: Session;
    let user : User;
    let attendance: Attendance;
    beforeEach(async () => {
      superadmin = await createRandomUser(SUPERADMIN_ROLE);
      session = await createDummySession();
      user = await createRandomUser(USER_ROLE);
      attendance = await AttendanceModel.create({
        user: user.id,
        session: mongoose.Types.ObjectId(session.id),
        paymentType: PAIDINADVANCE,
        status: CONFIRMEDBYPROVIDER,
      });
    })

    it('should update session status', async () => {
      const mutation = gql`
        mutation UpdateStatusAttendance($attendanceId: String!, $status: String!) {
          updateStatusAttendance(attendanceId: $attendanceId, status: $status)
        }
      `;
      const response = await gCall({
        source: mutation,
        variableValues: {
          attendanceId: attendance.id.toString(),
          status: NOSHOW,
        },
        ctx: {
          userId: superadmin.id,
          role: superadmin.role,
        },
      });
      if (response.errors) console.log(response.errors);
      expect(response.errors).not.to.exist;
      expect(response).to.have.property('data').and.not.to.be.null;
      expect(response.data!.updateStatusAttendance).to.be.true;
      const _attendance = await AttendanceModel.findById(attendance.id);
      expect(_attendance).not.to.be.null;
      expect(_attendance!.status).to.be.equal(NOSHOW);
    });
    it('should update session payment', async () => {
      const mutation = gql`
        mutation UpdatePaymentTypeAttendance($attendanceId: String!, $paymentType: String!) {
          updatePaymentTypeAttendance(attendanceId: $attendanceId, paymentType: $paymentType)
        }
      `;
      const response = await gCall({
        source: mutation,
        variableValues: {
          attendanceId: attendance.id.toString(),
          paymentType: TOPAYINSESSION,
        },
        ctx: {
          userId: superadmin.id,
          role: superadmin.role,
        },
      });
      if (response.errors) console.log(response.errors);
      expect(response.errors).not.to.exist;
      expect(response).to.have.property('data').and.not.to.be.null;
      expect(response.data!.updatePaymentTypeAttendance).to.be.true;
      const _attendance = await AttendanceModel.findById(attendance.id);
      expect(_attendance).not.to.be.null;
      expect(_attendance!.paymentType).to.be.equal(TOPAYINSESSION);
    });
  });
});
