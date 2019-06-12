import { User } from '../../data/models/user';
import { MyContext } from '../../logic/middleware/MyContext';
import { sign, verify } from 'jsonwebtoken';

const accessTokenDuration = 1000 * 60 * 15; 
const refreshTokenDuration = 1000 * 60 * 60 * 24 * 10; // 15min

export async function refreshToken(user: User, ctx: MyContext) {

  const refreshToken = await sign({ userId: user.id, role: user.role, count: user.refreshTokenCount }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: refreshTokenDuration,
  });
  const accessToken = await sign({ userId: user.id, role: user.role }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: accessTokenDuration,
  });

  ctx.res.cookie('refresh-token', refreshToken, {
    // httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: refreshTokenDuration,
  });
  ctx.res.cookie('access-token', accessToken, {
    // httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: accessTokenDuration,
  });

  return { accessToken, refreshToken };
}

export async function verifyAccessToken(accessToken: string): Promise<any> {
  return await verify(accessToken, process.env.JWT_ACCESS_SECRET!);
}

export async function verifyRefreshToken(refreshToken: string): Promise<any> {
  return await verify(refreshToken, process.env.JWT_REFRESH_SECRET!);
}
