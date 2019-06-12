import { FINISHED, PRIVATE } from './../../../../data/enums';
import { User } from './../../../../data/models/user';
import { gql } from 'apollo-server';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { ACTIVE, PUBLIC, SUPERADMIN_ROLE } from '../../../../data/enums';
import { Provider } from 'src/data/models/provider';
import { SessionModel } from '../../../../data/models/session';
import { gCall } from '../../../../common/test-utils/gqlCall';
import { random } from '../../../../common/utils';
import { createRandomUser } from '../../../tests-utils';
import { createTestProvider, deleteModels } from '../../../../common/test-utils';

chai.use(chaiAsPromised);
const { expect } = chai;

dotenv.config();
const {
  env: { MONGODB_URL_TESTING },
} = process;

describe('update/delete session', function() {
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

  describe('update session', () => {
    beforeEach(() => deleteModels());

    it('should update a session with proper id', async () => {
      // Prepare
      const superadmin = await createRandomUser(SUPERADMIN_ROLE);
      const session = await createDummySession();

      // Act
      const mutation = gql`
        mutation UpdateSession($sessionId: String!, $data: CreateSessionsInput!) {
          updateSession(sessionId: $sessionId, data: $data)
        }
      `;

      const _title = '**updated';
      const _coaches = [session.coaches[0]];
      const _startTime = new Date(2010, 9, 1, 18, 0, 0);
      const _endTime = new Date(2010, 9, 1, 19, 0, 0);
      const _maxAttendants = random(10);
      const _type = random((session.provider as Provider).sessionTypes);
      const _status = FINISHED;
      const _visibility = PRIVATE;
      const _notes = 'something random';

      const dataSession = {
        title: _title,
        providerId: (session.provider as Provider).id,
        coachesId: (_coaches as User[]).map(coach => coach.id),
        startTime: _startTime,
        endTime: _endTime,
        maxAttendants: _maxAttendants,
        typeId: _type.id,
        status: _status,
        visibility: _visibility,
        notes: _notes,
      };

      const response = await gCall({
        source: mutation,
        variableValues: {
          sessionId: session.id,
          data: dataSession,
        },
        ctx: {
          userId: superadmin.id,
          role: superadmin.role,
        },
      });

      // Expect
      const { data, errors } = response;
      expect(errors).to.be.undefined;
      expect(data).to.exist;
      expect(data).to.have.property('updateSession').to.be.true;

      // Check
      const _session = await SessionModel.findById(session.id);
      expect(_session).not.to.be.null;
      expect(_session!.title).to.be.equal(_title)
      expect(_session!.provider.toString()).to.be.equal(dataSession.providerId);
      expect(_session!.coaches).to.be.have.lengthOf(1)
      expect(_session!.coaches[0].toString()).to.be.equal((_coaches[0] as User).id);
      expect(_session!.startTime.getTime()).to.be.equal(_startTime.getTime());
      expect(_session!.endTime.getTime()).to.be.equal(_endTime.getTime());
      expect(_session!.maxAttendants).to.be.equal(_maxAttendants);
      expect(_session!.type.toString()).to.be.equal(dataSession.typeId);
      expect(_session!.status).to.be.equal(_status);
      expect(_session!.visibility).to.be.equal(_visibility);
      expect(_session!.notes).to.be.equal(_notes);
    });
  });

  describe('delete session', () => {
    beforeEach(() => deleteModels());

    it('should delete a session with proper id', async () => {
      // Prepare
      const superadmin = await createRandomUser(SUPERADMIN_ROLE);
      const session = await createDummySession();

      // Act
      const mutation = gql`
        mutation DeleteSession($sessionId: String!, $providerId: String!) {
          deleteSession(sessionId: $sessionId, providerId: $providerId)
        }
      `;
      const response = await gCall({
        source: mutation,
        variableValues: {
          sessionId: session.id,
          providerId: (session.provider as Provider).id,
        },
        ctx: {
          userId: superadmin.id,
          role: superadmin.role,
        },
      });

      // Expect
      const { data, errors } = response;
      expect(errors).to.be.undefined;
      expect(data).to.exist;
      expect(data).to.have.property('deleteSession').to.be.true;

      // Check
      const _session = await SessionModel.findById(session.id);
      expect(_session).to.be.null;
    });
  });
});
