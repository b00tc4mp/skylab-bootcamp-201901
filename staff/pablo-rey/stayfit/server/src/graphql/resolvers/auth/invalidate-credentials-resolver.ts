import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { UserModel } from '../../../models/user';
import { LogicError } from './../../../common/errors';
import { MyContext } from './../../../common/types/MyContext';
import { ONLY_SUPERADMIN, ALWAYS_OWN_USER } from './../../../graphql/middleware/authChecker';

@Resolver()
export class InvalidateCredentialsResolver {
  @Authorized([ALWAYS_OWN_USER, ONLY_SUPERADMIN])
  @Mutation(() => Boolean)
  async invalidateCredentials(@Arg('userId') userId: string, @Ctx() ctx: MyContext): Promise<boolean> {
    const user = await UserModel.findById(userId);
    if (!user) throw new LogicError('user not found');
    user.refreshTokenCount++;
    await user.save();
    return true;
  }
}
