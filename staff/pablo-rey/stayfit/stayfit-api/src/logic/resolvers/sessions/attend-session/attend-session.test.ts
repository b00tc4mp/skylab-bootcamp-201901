import { gql } from 'apollo-server';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import {
  ACTIVE,
  CONFIRMED,
  NOSHOW,
  PAIDINADVANCE,
  PUBLIC,
  SUPERADMIN_ROLE,
  TOPAYINSESSION,
  USER_ROLE,
  PENDINGCANCELLATION,
  CANCELLEDBYPROVIDER,
  ATTENDED,
  NOCOUNT,
  OK,
  PENDINGAPPROVAL,
} from '../../../../data/enums';
import { CANCELLEDBYUSER } from './../../../../data/enums';
import { User } from '../../../../data/models/user';
import { Session, SessionModel } from '../../../../data/models/session';
import { Attendance, AttendanceModel } from '../../../../data/models/attendance';
import { createRandomUser } from '../../../tests-utils';
import { random } from '../../../../common/utils';
import { gCall } from '../../../../common/test-utils/gqlCall';
import { createTestProvider, deleteModels } from '../../../../common/test-utils';

chai.use(chaiAsPromised);
const { expect } = chai;

dotenv.config();
const {
  env: { MONGODB_URL_TESTING },
} = process;

describe('attend/unattend session', function() {
  this.timeout(15000);
  before(() => mongoose.connect(MONGODB_URL_TESTING!, { useNewUrlParser: true }));
  after(async () => await mongoose.disconnect());

  async function createDummySession() {
    const { provider, coaches } = await createTestProvider({});
    const type = random(provider.sessionTypes);
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
    this.timeout(15000);
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
        status: CONFIRMED,
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
      expect(_attendance!.status).to.be.equal(CONFIRMED);
      const _session = await SessionModel.findById(session.id);
      expect(_session).not.to.be.null;
      expect(_session!.attendances).to.have.lengthOf(1);
      expect(_session!.attendances[0].toString()).to.be.equal(_attendance!.id);
    });
  });

  describe('attend session', function() {
    this.timeout(15000);
    beforeEach(() => deleteModels());

    let superadmin: User;
    let session: Session;
    let user: User;
    let attendance: Attendance;
    beforeEach(async () => {
      superadmin = await createRandomUser(SUPERADMIN_ROLE);
      session = await createDummySession();
      user = await createRandomUser(USER_ROLE);
      attendance = await AttendanceModel.create({
        user: user.id,
        session: mongoose.Types.ObjectId(session.id),
        paymentType: PAIDINADVANCE,
        status: CONFIRMED,
      });
    });

    it('should update session status with superadmin credentials', async () => {
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

    it('should update session status with user credentials', async () => {
      const mutation = gql`
        mutation UpdateStatusAttendance($attendanceId: String!, $status: String!) {
          updateStatusAttendance(attendanceId: $attendanceId, status: $status)
        }
      `;
      const response = await gCall({
        source: mutation,
        variableValues: {
          attendanceId: attendance.id.toString(),
          status: PENDINGCANCELLATION,
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
      expect(_attendance!.status).to.be.equal(PENDINGCANCELLATION);
    });

    describe('updates not allow user', () => {
      async function shouldFail(oldStatus: string, newStatus: string) {
        attendance = await AttendanceModel.create({
          user: user.id,
          session: mongoose.Types.ObjectId(session.id),
          paymentType: PAIDINADVANCE,
          status: oldStatus,
        });
        const mutation = gql`
          mutation UpdateStatusAttendance($attendanceId: String!, $status: String!) {
            updateStatusAttendance(attendanceId: $attendanceId, status: $status)
          }
        `;
        const response = await gCall({
          source: mutation,
          variableValues: {
            attendanceId: attendance.id.toString(),
            status: newStatus,
          },
          ctx: {
            userId: user.id,
            role: user.role,
          },
        });
        expect(response.errors).to.exist;
        expect(response.errors![0].message).to.match(/^(user not allowed)/);
        expect(response).to.have.property('data').and.to.be.null;
        const _attendance = await AttendanceModel.findById(attendance.id);
        expect(_attendance).not.to.be.null;
        expect(_attendance!.status).to.be.equal(oldStatus);
      }

      it('should fail update session status with user credentials from CONFIRMED to CANCELLEDBYUSER', async () => {
        await shouldFail(CONFIRMED, CANCELLEDBYUSER);
      });
      it('should fail update session status with user credentials from PENDINGCANCELLATION to OK', async () => {
        await shouldFail(PENDINGCANCELLATION, OK);
      });
      it('should fail update session status with user credentials from OK to anything but CANCELLEDBYUSER', async () => {
        await shouldFail(OK, CONFIRMED);
      });
      it('should fail update session status with user credentials from PENDINGAPPROVAL to anything but CANCELLEDBYUSER', async () => {
        await shouldFail(PENDINGAPPROVAL, CONFIRMED);
      });
      it('should fail update session status with user credentials newStatus: [CANCELLEDBYPROVIDER, NOSHOW, ATTENDED, NOCOUNT] ', async () => {
        for (let newStatus of [CANCELLEDBYPROVIDER, NOSHOW, ATTENDED, NOCOUNT]) {
          await shouldFail(CONFIRMED, newStatus);
        }
      });
      it('should fail update session status with user credentials oldStatus: [CANCELLEDBYPROVIDER, NOSHOW, ATTENDED, NOCOUNT] ', async () => {
        for (let oldStatus of [CANCELLEDBYPROVIDER, NOSHOW, ATTENDED, NOCOUNT]) {
          await shouldFail(oldStatus, CANCELLEDBYUSER);
        }
      });
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
