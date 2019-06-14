import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { Provider, ProviderModel } from '../../../data/models/provider';
import { ONLY_ADMINS_OF_PROVIDER } from '../../middleware/authChecker';
import { MyContext } from '../../middleware/MyContext';

@Resolver(Provider)
export class ProviderResolver {
  /**
   * Retrieve all information of a provider (authorized only for admins of this provider)
   * 
   * @param providerId 
   * @param ctx 
   */
  @Authorized(ONLY_ADMINS_OF_PROVIDER)
  @Query(returns => Provider)
  async retrieveProvider(@Arg('providerId') providerId: string, @Ctx() ctx: MyContext) {
    const provider = await ProviderModel.findById(providerId).populate('admins').populate('coaches').populate('customers');
    return provider;
  }
}
