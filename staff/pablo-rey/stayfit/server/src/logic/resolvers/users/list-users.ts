import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { MyContext } from '../../middleware/MyContext';
import { ONLY_ADMINS_OF_PROVIDER, ONLY_SUPERADMIN } from '../../middleware/authChecker';
import { ProviderModel } from '../../../data/models/provider';
import { User, UserModel } from '../../../data/models/user';
import { LogicError } from '../../../common/errors';

@Resolver(User)
export class ListUsersResolvers {
  @Authorized(ONLY_SUPERADMIN)
  @Query(returns => [User])
  async listAllUsers(@Ctx() ctx: MyContext) {
    return await UserModel.find();
  }

  @Authorized(ONLY_ADMINS_OF_PROVIDER)
  @Query(returns => [User])
  async listCustomers(@Arg('providerId') providerId: string, @Ctx() ctx: MyContext) {
    const provider = await ProviderModel.findById(providerId, 'customers').populate('customers')
    if (!provider) throw new LogicError('provider is required')
    return provider!.customers;
  }
}
