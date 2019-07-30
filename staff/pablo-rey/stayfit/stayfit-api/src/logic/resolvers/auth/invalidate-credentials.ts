import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { UserModel } from '../../../data/models/user';
import { LogicError } from '../../../common/errors';
import { MyContext } from '../../middleware/MyContext';
import { ONLY_SUPERADMIN, ALWAYS_OWN_USER } from '../../middleware/authChecker';

@Resolver()
export class InvalidateCredentialsResolver {

  /**
   * Invalidate the refresh token issued now
   * 
   * @param userId 
   * @param ctx 
   */
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
