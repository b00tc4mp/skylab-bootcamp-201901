import { Request, Response } from 'express';
import { refreshToken as refreshTokenFn, verifyAccessToken, verifyRefreshToken } from '../../common/token/refresh-tokens';
import { UserModel } from '../../data/models/user';

export default async function({ req, res }: { req: Request; res: Response }) {
  const invalidAuth = { req, res, userId: null };
  const accessToken = req.cookies['access-token'];
  const refreshToken = req.cookies['refresh-token'];

  if (!accessToken && !refreshToken) return invalidAuth;

  let validAccess, validRefresh;
  if (accessToken) {
    try {
      validAccess = await verifyAccessToken(accessToken);
      return { req, res, userId: validAccess.userId };
    } catch {}
  }
  try {
    validRefresh = await verifyRefreshToken(refreshToken);
  } catch (err) {
    console.log(err)
  }
  if (!validRefresh) return invalidAuth;
  const user = await UserModel.findById(validRefresh.userId);
  if (!user) return invalidAuth;
  if (validRefresh.count === user.refreshTokenCount) {
    await refreshTokenFn(user, { res, req, userId: user.id, user});
    return { req, res, userId: user.id };
  }
  return invalidAuth;
}
