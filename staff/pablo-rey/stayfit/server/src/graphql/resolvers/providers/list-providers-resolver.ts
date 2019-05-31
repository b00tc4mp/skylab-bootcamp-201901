import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { MyContext } from '../../../common/types/MyContext';
import { ONLY_SUPERADMIN } from '../../../graphql/middleware/authChecker';
import { ProviderModel } from '../../../models/provider';
import { User } from '../../../models/user';
import { Provider } from './../../../models/provider';

@Resolver(User)
export class ListProviderResolver {
  @Authorized(ONLY_SUPERADMIN)
  @Query(returns => [Provider])
  async listAllProvider(@Ctx() ctx: MyContext) {
    return await ProviderModel.find()
      .populate('admins')
      .populate('customers')
      .populate('coaches');
  }
}
