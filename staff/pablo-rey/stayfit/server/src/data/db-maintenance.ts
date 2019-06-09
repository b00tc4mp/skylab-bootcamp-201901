import * as bcrypt from 'bcryptjs';
import { createSession } from '../logic/resolvers/sessions/create-session/create-session';
import { ACTIVE, PUBLIC, STAFF_ROLE, SUPERADMIN_ROLE, USER_ROLE, ACCEPT, REQUESTBECUSTOMER, ATTENDANCEPAYMENTTYPES, ATTENDANCESTATUSES} from './enums';
import { SessionModel } from './models/session';
import { User, UserModel } from './models/user';
import { ProviderModel, Provider } from './models/provider';
import { SessionTypeModel } from './models/session-type';
import moment = require('moment');
import faker = require('faker');
import { RequestCustomerModel } from './models/request';
import { random } from '../common/utils';
import { AttendanceModel } from './models/attendance';

export async function cleanDb() {
  await UserModel.deleteMany({});
  await ProviderModel.deleteMany({});
  await SessionTypeModel.deleteMany({});
  await SessionModel.deleteMany({});
  await RequestCustomerModel.deleteMany({});
  await AttendanceModel.deleteMany({})
}

export async function populateDb() {
  console.log('Creando superusuario...');
  const superadmin = await UserModel.create({
    name: 'Super',
    surname: 'Admin',
    email: 'superadmin@stay.fit',
    password: await bcrypt.hash('123', 12),
    role: SUPERADMIN_ROLE,
    uploadedPortrait: `https://randomuser.me/api/portraits/${faker.random.arrayElement([
      'men',
      'women',
    ])}/${faker.random.number(80)}.jpg`,
  });

  console.log('Creando admin...');
  const admin = await UserModel.create({
    name: 'Box',
    surname: 'Admin',
    email: 'admin1@stay.fit',
    password: await bcrypt.hash('123', 12),
    role: STAFF_ROLE,
    uploadedPortrait: `https://randomuser.me/api/portraits/${faker.random.arrayElement([
      'men',
      'women',
    ])}/${faker.random.number(80)}.jpg`,
  });

  console.log('Creando admin2...');
  const admin2 = await UserModel.create({
    name: 'Box',
    surname: 'Admin',
    email: 'admin2@stay.fit',
    password: await bcrypt.hash('123', 12),
    role: STAFF_ROLE,
    uploadedPortrait: `https://randomuser.me/api/portraits/${faker.random.arrayElement([
      'men',
      'women',
    ])}/${faker.random.number(80)}.jpg`,
  });

  console.log('Creando coaches...');
  const coaches: User[] = [];
  for (let ii = 0, ll = 3; ii < ll; ii++) {
    coaches.push(
      await UserModel.create({
        name: faker.name.firstName(),
        surname: faker.name.lastName() + ' Coach ' + ii,
        email: `coach${ii}@stay.fit`,
        password: await bcrypt.hash('123', 12),
        role: STAFF_ROLE,
        uploadedPortrait: `https://randomuser.me/api/portraits/${faker.random.arrayElement([
          'men',
          'women',
        ])}/${faker.random.number(80)}.jpg`,
      })
    );
  }

  const provider1 = await ProviderModel.create({
    name: "Agogé Physical Training",
    admins: [admin],
    coaches,
    customers: [],
    uploadedBanner: 'https://www.agoge.ovh/images/logo_agoge.jpg',
    uploadedPortrait: 'https://www.48hourslogo.com/48hourslogo_data/2018/11/12/78999_1542026387.jpg',
  });

  admin.adminOf = [provider1];
  await admin.save();

  console.log('Creando provider2...');
  const provider2 = await ProviderModel.create({
    name: faker.company.companyName(),
    admins: [admin2],
    coaches,
    customers: [],
    uploadedBanner:
      'https://blogmedia.dealerfire.com/wp-content/uploads/sites/394/2018/06/Crossfit-training-3-banner.jpg',
    uploadedPortrait:
      'https://image.shutterstock.com/image-vector/modern-vector-professional-sign-logo-260nw-594906506.jpg',
  });

  admin2.adminOf = [provider2];
  admin2.save();

  // 0-9 only provider1
  // 10-19 customer of provider1 and provider2
  // 20-29 only provider2
  // 30-> without provider
  console.log('Creando customers...');
  const customers: User[] = [];
  for (let ii = 0, ll = 40; ii < ll; ii++) {
    const providers = [];
    if (ii < 20) providers.push(provider1);
    if (ii >= 10 && ii < 30) providers.push(provider2);
    const user = await UserModel.create({
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      email: `user${ii}@stay.fit`,
      password: await bcrypt.hash('123', 12),
      role: USER_ROLE,
      adminOf: [],
      coachOf: [],
      customerOf: providers,
      uploadedPortrait: `https://randomuser.me/api/portraits/${faker.random.arrayElement([
        'men',
        'women',
      ])}/${faker.random.number(80)}.jpg`,
    });
    for (let provider of providers) {
      await RequestCustomerModel.create({provider, user, type:REQUESTBECUSTOMER, status: ACCEPT, })
    }
    customers.push(user);
  }

  console.log('Creando provider1...');

  provider1.customers = customers.slice(0, 20);
  provider1.save();

  provider2.customers = customers.slice(10, 20);
  provider2.save();

  // Session Types

  console.log('Creando session types...');
  for (let provider of [provider1, provider2]) {
    await SessionTypeModel.create({ type: 'wod', title: 'WOD', active: true, provider });
    await SessionTypeModel.create({ type: 'ob', title: 'Open Box', active: true, provider });
    await SessionTypeModel.create({ type: 'pt', title: 'Personal training', active: true, provider });
  }
  await SessionTypeModel.create({ type: 'nut', title: 'Nutrición', active: true, provider: provider2 });
  await SessionTypeModel.create({ type: 'ob', title: 'Fisioterapia', active: true, provider: provider1 });

  // Sessions

  console.log('Creando session types...');
  const day = moment().format('YYYY-MM-DD');
  let startTime = moment(`${day} 08:00:00`, 'YYYY-MM-DD hh:mm:ss', true);
  await populateSessions(provider1, startTime, 10, coaches);
  await populateSessions(provider1, startTime, 10, coaches);
  await populateSessions(provider1, startTime, 10, coaches);
  await populateSessions(provider1, startTime, 10, coaches);
  await populateSessions(provider1, startTime, 10, coaches);
  await populateSessions(provider1, startTime, 10, coaches);
  await populateSessions(provider1, startTime, 10, coaches);
  await populateSessions(provider1, startTime, 10, coaches);
  await populateSessions(provider1, startTime, 10, coaches);
  await populateSessions(provider1, startTime, 10, coaches);
  await populateSessions(provider1, startTime, 10, coaches);

  startTime = moment(`${day} 08:00:00`, 'YYYY-MM-DD hh:mm:ss', true);
  await populateSessions(provider2, startTime, 10, coaches);
  await populateSessions(provider2, startTime, 10, coaches);

  // create attendances
  const sessions = await SessionModel.find({}).populate('provider');
  for (let session of sessions) {
    let s = new Set();
    let ll= Math.max(random(session.maxAttendants), random(10) < 4 ? session.maxAttendants : 0);
    for (let ii=0; ii < ll; ii++){
      s.add(random((session.provider as Provider).customers))
    }
    for (let user of s) {
      const attendance = await AttendanceModel.create({user, session, paymentType: random(ATTENDANCEPAYMENTTYPES), status: random(ATTENDANCESTATUSES)})
      session.attendances.push(attendance)
      await session.save();
    }
  }
}

async function populateSessions(provider: Provider, _startTime: moment.Moment, numDays: number, coaches: User[]) {
  const type = await SessionTypeModel.findOne({ type: 'wod', provider: provider.id });
  const title = faker.company.bs();
  const providerId = provider.id.toString();
  const startTime = _startTime.toDate();
  const endTime = _startTime.add(1, 'hour').toDate();
  const maxAttendants = 10;
  const typeId = type!.id;
  const status = ACTIVE;
  const visibility = PUBLIC;
  const start = _startTime.format('YYYY-MM-DD');
  const repeat: Date[] = [];
  for (let ii = 0, ll = numDays; ii < ll; ii++) {
    const day = moment(start, 'YYYY-MM-DD', true)
      .startOf('day')
      .add(ii, 'day');
    if (Math.random() > 0.3) repeat.push(day.toDate());
  }
  const sessionsId = await createSession(
    {
      title,
      providerId,
      coachesId: provider.coaches.map(c => c.toString()),
      repeat,
      maxAttendants,
      typeId,
      status,
      visibility,
      startTime,
      endTime,
    },
    provider,
    coaches
  );
}
