import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { User, UserModel } from '../../../data/models/user';
import { MyContext } from '../../middleware/MyContext';

@Resolver(User)
export class MeResolver {
  /**
   * Retrieve all user data of authenticated user
   * 
   * @param ctx 
   */
  @Authorized()
  @Query(returns => User)
  async me(@Ctx() ctx: MyContext) {
    const user = await UserModel.findById(ctx.userId)
      .populate({ path: 'adminOf', populate: { path: 'coaches sessionTypes' } })
      .populate('coachOf')
      .populate('customerOf')
    return user;
  }
}
