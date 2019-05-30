import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as dotenv from 'dotenv';
import * as faker from 'faker';
import * as mongoose from 'mongoose';
import sessionLogic from '.';
import { SUPERADMIN_ROLE } from '../../models/user';
import { cleanDb, createRandomUser } from '../tests-utils';
import { ProviderModel } from './../../models/provider';
import { ACTIVE, PUBLIC, SessionModel } from './../../models/session';
import { SessionTypeModel } from './../../models/session-type';

dotenv.config();
const {
  env: { MONGODB_URL_TESTING },
} = process;

chai.use(chaiAsPromised);
const { expect } = chai;

const { ObjectId } = mongoose.Types;

describe('sessions', function() {
  this.timeout(5000);

  before(() => mongoose.connect(MONGODB_URL_TESTING!, { useNewUrlParser: true }));
  after(async () => await mongoose.disconnect());

  beforeEach(() => cleanDb());

  describe('create session', function() {
    it('create session with correct data', async function() {
      const name = faker.company.companyName();
      const owner = await createRandomUser(SUPERADMIN_ROLE);

      const title = 'testing title';
      const provider = await ProviderModel.create({ name, admins: [owner], coaches: [owner] });
      const coaches = [owner];
      const startTime = new Date('2019-06-01 10:00:00');
      const endTime = new Date('2019-06-01 11:00:00');
      const maxAttendants = 10;
      const type = await SessionTypeModel.findOne({ type: 'wod' });
      const status = ACTIVE;
      const visibility = PUBLIC;

      const sessionId = await sessionLogic.create({
        title,
        provider,
        coaches,
        startTime,
        endTime,
        maxAttendants,
        type: type!,
        status,
        visibility,
      });
      expect(sessionId).not.to.be.undefined;
      expect(sessionId).to.be.a('string');
      const _sessions = await SessionModel.find();
      expect(_sessions).to.have.lengthOf(1);
      const _session = _sessions[0];
      expect(_session)
        .to.have.property('title')
        .and.be.equal(title);

      expect(_session).to.have.property('provider');
      expect(ObjectId(provider.id).equals(_session.provider as any)).to.be.true;
      expect(_session).to.have.property('coaches');
      expect(_session.coaches[0].toString() as any).to.be.equal(owner.id.toString());
      expect(_session).to.have.property('startTime');
      expect(_session.startTime.getTime()).to.be.equal(startTime.getTime());
      expect(_session).to.have.property('endTime');
      expect(_session.endTime.getTime()).to.be.equal(endTime.getTime());
      expect(_session)
        .to.have.property('maxAttendants')
        .and.be.equal(maxAttendants);
      expect(_session).to.have.property('type');
      expect(_session.type.toString() as any).to.be.equal(type!.id.toString());
      expect(_session)
        .to.have.property('status')
        .and.be.equal(status);
      expect(_session)
        .to.have.property('visibility')
        .and.be.equal(visibility);
    });
  });
});
