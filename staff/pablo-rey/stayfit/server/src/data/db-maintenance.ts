import { SUPERADMIN_ROLE, UserModel, User } from './../models/user';
import * as bcrypt from 'bcryptjs';

export async function cleanDb() {
  await UserModel.deleteMany({});
}

export async function populateDb() {
  await UserModel.create({
    name: 'Super',
    surname: 'Admin',
    email: 'superadmin@stay.fit',
    password: await bcrypt.hash('123', 12),
    role: SUPERADMIN_ROLE,
  });
}
