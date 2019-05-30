import { AuthenticationError } from 'apollo-server';
import * as bcrypt from 'bcryptjs';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { refreshToken } from './../../../common/token/refresh-tokens';
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { UserModel } from '../../../models/user';
import { MyContext } from './../../../common/types/MyContext';
import { checkAuth } from './../../../graphql/authorization';
import { LogicError } from './../../../common/errors';

export const AUTH_AUTH_INVALIDATE_CREDENTIALS = 'AUTH_AUTH_INVALIDATE_CREDENTIALS';

@Resolver()
export class InvalidateCredentialsResolver {
  @Mutation(() => Boolean)
  async invalidateCredentials(@Arg('userId') userId: string, @Ctx() ctx: MyContext): Promise<boolean> {
    const user = await UserModel.findById(userId);
    if (!user) throw new LogicError('user not found');
    await checkAuth(AUTH_AUTH_INVALIDATE_CREDENTIALS, { owner: ctx.userId, userId})
    user.refreshTokenCount++;
    await user.save();
    return true;
  }
}
