import { AuthorizationError } from './../../../common/errors/index';
import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { MyContext } from '../../middleware/MyContext';
import { ONLY_ADMINS_OF_PROVIDER, ONLY_SUPERADMIN, ALWAYS_OWN_USER, ONLY_OWN_USER } from '../../middleware/authChecker';
import { ProviderModel, Provider } from '../../../data/models/provider';
import { User, UserModel } from '../../../data/models/user';
import { ValidationError } from '../../../common/errors/index';

@Resolver(User)
export class MeResolver {
  @Authorized()
  @Query(returns => User)
  async me(@Ctx() ctx: MyContext) {
    const user = await UserModel.findById(ctx.userId).populate('adminOf').populate('coachOf').populate('customerOf');
    return user;
  }
}
