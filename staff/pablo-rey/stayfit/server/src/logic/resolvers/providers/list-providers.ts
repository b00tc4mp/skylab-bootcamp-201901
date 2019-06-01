import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { MyContext } from '../../middleware/MyContext';
import { ONLY_SUPERADMIN } from '../../middleware/authChecker';
import { ProviderModel } from '../../../data/models/provider';
import { User } from '../../../data/models/user';
import { Provider } from '../../../data/models/provider';

@Resolver(User)
export class ListProvidersResolver {
  @Authorized(ONLY_SUPERADMIN)
  @Query(returns => [Provider])
  async listProviders(@Ctx() ctx: MyContext) {
    return await ProviderModel.find()
      .populate('admins')
      .populate('customers')
      .populate('coaches');
  }

  @Query(returns => [Provider])
  async listProvidersPublicInfo(@Ctx() ctx: MyContext) {
    const providers = await ProviderModel.find();
    const result = providers.map(({id, name, bannerImageUrl, portraitImageUrl}) => ({id, name, bannerImageUrl, portraitImageUrl}))
    return result
  }

}
