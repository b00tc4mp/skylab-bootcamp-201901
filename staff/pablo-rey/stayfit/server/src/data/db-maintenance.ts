import * as bcrypt from 'bcryptjs';
import { createSession } from '../logic/resolvers/sessions/create-session/create-session-resolver';
import { ACTIVE, PUBLIC } from './models/session';
import { STAFF_ROLE, SUPERADMIN_ROLE, User, UserModel, USER_ROLE } from './models/user';
import { ProviderModel } from './models/provider';
import { SessionTypeModel } from './models/session-type';
import moment = require('moment');

export async function cleanDb() {
  await UserModel.deleteMany({});
  await ProviderModel.deleteMany({});
  await SessionTypeModel.deleteMany({});
}

export async function populateDb() {
  console.log('Creando superusuario...')
  const superadmin = await UserModel.create({
    name: 'Super',
    surname: 'Admin',
    email: 'superadmin@stay.fit',
    password: await bcrypt.hash('123', 12),
    role: SUPERADMIN_ROLE,
  });
  console.log('Creando admin...')
  const admin = await UserModel.create({
    name: 'Box',
    surname: 'Admin',
    email: 'admin1@stay.fit',
    password: await bcrypt.hash('123', 12),
    role: STAFF_ROLE,
  });
  console.log('Creando coaches...')
  const coaches: User[] = [];
  for (let ii = 0, ll = 3; ii < ll; ii++) {
    coaches.push(
      await UserModel.create({
        name: 'Box',
        surname: 'Coach ' + ii,
        email: `coach${ii}@stay.fit`,
        password: await bcrypt.hash('123', 12),
        role: STAFF_ROLE,
      })
    );
  }

  console.log('Creando customers...')

  const customers: User[] = [];
  for (let ii = 0, ll = 15; ii < ll; ii++) {
    customers.push(
      await UserModel.create({
        name: 'Box',
        surname: 'User ' + ii,
        email: `user${ii}@stay.fit`,
        password: await bcrypt.hash('123', 12),
        role: USER_ROLE,
      })
    );
  }
  console.log('Creando provider1...')

  const provider1 = await ProviderModel.create({
    name: 'Testing provider',
    admins: [admin],
    coaches,
    customers,
    bannerImageUrl: 'https://crossfitstreets.com/wp-content/uploads/2016/02/banner-stayatcrossfit.jpg',
    logoImageUrl: 'https://www.48hourslogo.com/48hourslogo_data/2018/11/12/78999_1542026387.jpg',
  });

  
  console.log('Creando admin2...')
  const admin2 = await UserModel.create({
    name: 'Box',
    surname: 'Admin',
    email: 'admin2@stay.fit',
    password: await bcrypt.hash('123', 12),
    role: STAFF_ROLE,
  });
  const admins2 = [admin2];

  
  console.log('Creando provider2...')
  const provider2 = await ProviderModel.create({
    name: 'Testing provider 2',
    admins: admins2,
    coaches,
    customers,
    bannerImageUrl:
      'https://blogmedia.dealerfire.com/wp-content/uploads/sites/394/2018/06/Crossfit-training-3-banner.jpg',
    logoImageUrl:
      'https://image.shutterstock.com/image-vector/modern-vector-professional-sign-logo-260nw-594906506.jpg',
  });

  // Session Types

  console.log('Creando session types...')
  for (let provider of [provider1, provider2]) {
    await SessionTypeModel.create({ type: 'wod', title: 'WOD', active: true, provider });
    await SessionTypeModel.create({ type: 'ob', title: 'Open Box', active: true, provider });
    await SessionTypeModel.create({ type: 'pt', title: 'Personal training', active: true, provider });
  }
  await SessionTypeModel.create({ type: 'nut', title: 'Nutrición', active: true, provider: provider2 });
  await SessionTypeModel.create({ type: 'ob', title: 'Fisioterapia', active: true, provider: provider1 });

  // Sessions

  const type = await SessionTypeModel.findOne({ type: 'wod', provider:provider1 });
  const title = 'Test session';
  const providerId = provider1.id;
  const startTime = moment('03/06/2019 10:00:00', 'DD/MM/YYYY hh:mm:ss', true).toDate();
  const endTime = moment('03/06/2019 11:00:00', 'DD/MM/YYYY hh:mm:ss', true).toDate();
  const maxAttendants = 10;
  const typeId = type!.id;
  const status = ACTIVE;
  const visibility = PUBLIC;
  const start = '04/06/2019';
  const repeat: Date[] = [];
  for (let ii = 0, ll = 6; ii < ll; ii++) {
    const day = moment(start, 'DD/MM/YYYY', true)
      .startOf('day')
      .add(ii, 'day');
    repeat.push(day.toDate());
  }
  const sessionsId = await createSession(
    {
      title,
      providerId,
      coachesId: provider1.coaches.map(c => c.toString()),
      repeat,
      maxAttendants,
      typeId,
      status,
      visibility,
      startTime,
      endTime,
    },
    provider1,
    coaches
  );

  // create attendances

}
