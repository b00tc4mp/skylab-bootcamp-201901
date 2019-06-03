import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { MyContext } from '../../middleware/MyContext';
import { ONLY_ADMINS_OF_PROVIDER, ONLY_SUPERADMIN, ALWAYS_OWN_USER, ONLY_OWN_USER } from '../../middleware/authChecker';
import { ProviderModel, Provider } from '../../../data/models/provider';
import { User, UserModel } from '../../../data/models/user';
import { ValidationError } from '../../../common/errors/index';

@Resolver(User)
export class RetrieveUserResolver {
  @Authorized([ALWAYS_OWN_USER])
  @Query(returns => [User])
  async retrieveUser(@Arg('userId') userId: string, @Ctx() ctx: MyContext) {
    return await UserModel.find();
  }

  @Query(returns => [Provider])
  async adminOf(@Arg('userId') userId: string, @Ctx() ctx: MyContext) {
    const user = await UserModel.findById(userId);
    if (!user) throw new ValidationError('user is required')
    const providers = await ProviderModel.find({ admins: user });
    return providers;
  }
}
