import * as jwt from 'jsonwebtoken';
import { UserModel } from './../../models/user';

export default async function({ req }: { req: any }) {
  let token = req.headers['authorization'];
  if (!token) return { req };
  token = token.slice(7);
  const valid = jwt.verify(token, process.env.JWT_SECRET!);
  if (!valid) return { req };
  const { sub, iat, exp } = valid as any;
  // TODO: comprobar expiración
  const user = await UserModel.findById(sub);
  return { req, user, userId: sub };
}
