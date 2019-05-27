import { SUPERADMIN_ROLE, UserModel, UserType } from './../models/user';
import * as bcrypt from 'bcryptjs';

export async function cleanDb() {
  await UserModel.deleteMany({});
}

export async function populateDb() {
  const superAdmin: UserType = {
    name: 'Super',
    surname: 'Admin',
    role: 'superadmin@stay.fit',
    password: await bcrypt.hash('123', 12),
    role: SUPERADMIN_ROLE,
  };
  UserModel.create(superAdmin);
}
