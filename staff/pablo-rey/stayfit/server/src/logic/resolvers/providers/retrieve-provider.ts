import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { Provider, ProviderModel } from '../../../data/models/provider';
import { ONLY_ADMINS_OF_PROVIDER } from '../../middleware/authChecker';
import { MyContext } from '../../middleware/MyContext';

@Resolver(Provider)
export class ProviderResolver {
  @Authorized(ONLY_ADMINS_OF_PROVIDER)
  @Query(returns => Provider)
  async retrieveProvider(@Arg('providerId') providerId: string, @Ctx() ctx: MyContext) {
    const provider = await ProviderModel.findById(providerId).populate('admins').populate('coaches').populate('customers');
    return provider;
  }
}
