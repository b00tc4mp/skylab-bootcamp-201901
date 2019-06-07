import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { User, UserModel } from '../../../data/models/user';
import { MyContext } from '../../middleware/MyContext';

@Resolver(User)
export class MeResolver {
  @Authorized()
  @Query(returns => User)
  async me(@Ctx() ctx: MyContext) {
    const user = await UserModel.findById(ctx.userId).populate('adminOf').populate('coachOf').populate('customerOf');
    return user;
  }
}
