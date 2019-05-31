import { SUPERADMIN_ROLE, UserModel, User, STAFF_ROLE, USER_ROLE } from './../models/user';
import * as bcrypt from 'bcryptjs';
import { ProviderModel } from './../models/provider';
import { SessionTypeModel } from './../models/session-type';

export async function cleanDb() {
  await UserModel.deleteMany({});
  await ProviderModel.deleteMany({})
  await SessionTypeModel.deleteMany({});
}

export async function populateDb() {
  const superadmin = await UserModel.create({
    name: 'Super',
    surname: 'Admin',
    email: 'superadmin@stay.fit',
    password: await bcrypt.hash('123', 12),
    role: SUPERADMIN_ROLE,
  });
  const admin = await UserModel.create({
    name: 'Box',
    surname: 'Admin',
    email: 'admin1@stay.fit',
    password: await bcrypt.hash('123', 12),
    role: STAFF_ROLE,
  });
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
  const provider1 = await ProviderModel.create({
    name: 'Testing provider',
    admins: [admin],
    coaches,
    customers,
    bannerImageUrl: 'https://crossfitstreets.com/wp-content/uploads/2016/02/banner-stayatcrossfit.jpg',
    logoImageUrl: 'https://www.48hourslogo.com/48hourslogo_data/2018/11/12/78999_1542026387.jpg',
  });

  const admin2 = await UserModel.create({
    name: 'Box',
    surname: 'Admin',
    email: 'admin2@stay.fit',
    password: await bcrypt.hash('123', 12),
    role: STAFF_ROLE,
  });
  const admins2 = [admin2]
  const provider2 = await ProviderModel.create({
    name: 'Testing provider 2',
    admins: admins2,
    coaches,
    customers,
    bannerImageUrl: 'https://blogmedia.dealerfire.com/wp-content/uploads/sites/394/2018/06/Crossfit-training-3-banner.jpg',
    logoImageUrl: 'https://image.shutterstock.com/image-vector/modern-vector-professional-sign-logo-260nw-594906506.jpg',
  });

  for (let provider of [provider1,provider2]) {
    await SessionTypeModel.create({ type: 'wod', title: 'WOD', active: true, provider});
    await SessionTypeModel.create({ type: 'ob', title: 'Open Box', active: true, provider});
    await SessionTypeModel.create({ type: 'pt', title: 'Personal training', active: true, provider });
  }
  await SessionTypeModel.create({ type: 'nut', title: 'Nutrición', active: true, provider: provider2});
  await SessionTypeModel.create({ type: 'ob', title: 'Fisioterapia', active: true, provider: provider1});
}
