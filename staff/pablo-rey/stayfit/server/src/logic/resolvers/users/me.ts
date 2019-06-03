import { AuthorizationError } from './../../../common/errors/index';
import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { MyContext } from '../../middleware/MyContext';
import { ONLY_ADMINS_OF_PROVIDER, ONLY_SUPERADMIN, ALWAYS_OWN_USER, ONLY_OWN_USER } from '../../middleware/authChecker';
import { ProviderModel, Provider } from '../../../data/models/provider';
import { User, UserModel } from '../../../data/models/user';
import { ValidationError } from '../../../common/errors/index';

@Resolver(User)
export class MeResolver {
  @Query(returns => User)
  async me(@Ctx() ctx: MyContext) {
    if (!ctx.userId) throw new AuthorizationError('user is required. Maybe you are not authenticated')
    const user = await UserModel.findById(ctx.userId).populate('adminOf').populate('coachOf').populate('customerOf');
    return user;
  }
}
