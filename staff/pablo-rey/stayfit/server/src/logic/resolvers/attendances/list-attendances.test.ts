import { User } from './../../../data/models/user';
import { gql } from 'apollo-server-express';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { ACTIVE, OK, PAIDINADVANCE, PUBLIC } from '../../../data/enums';
import { Provider } from './../../../data/models/provider';
import { SessionModel } from '../../../data/models/session';
import { AttendanceModel } from './../../../data/models/attendance';
import { createTestProvider } from '../../../common/test-utils';
import { gCall } from '../../../common/test-utils/gqlCall';
import { random } from '../../../common/utils';

chai.use(chaiAsPromised);
const { expect } = chai;

dotenv.config();
const {
  env: { MONGODB_URL_TESTING },
} = process;

describe('list my attendances', function() {
  this.timeout(10000);

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

  it.only('should list my attendances', async () => {
    const query = gql`
      query {
        listMyNextAttendances {
          session {
            id
            title
            provider {
              id
              name
              portraitImageUrl
            }
            coaches {
              name
            }
            startTime
            endTime
            maxAttendants
            visibility
            countAttendances
            status
            notes
            type {
              type
              title
            }
          }
          myAttendance {
            id
            status
          }
        }
      }
    `;
    debugger
    const session = await createDummySession();
    const user = (session.provider as Provider).customers[0] as User;
    const att = await AttendanceModel.create({ user, session, paymentType: PAIDINADVANCE, status: OK });

    // Act
    const response = await gCall({
      source: query,
      ctx: {
        userId: user.id,
        role: user.role,
      },
    });
    if (response.errors) console.log(response.errors);
    expect(response.errors).not.to.exist;
    expect(response.data).to.exist;
    const data = response.data!.listMyNextAttendances;
    expect(data)
      .to.be.instanceOf(Array)
      .and.to.have.lengthOf(1);
    expect(data[0].session.id).to.be.equal(session.id);
    expect(data[0].myAttendance.id).to.be.equal(att.id);
  });
});
