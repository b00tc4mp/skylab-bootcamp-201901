import { CreateProviderResolver } from './create-provider';
import { AuthorizationError } from './../../../common/errors/index';
import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { MyContext } from '../../middleware/MyContext';
import { ONLY_ADMINS_OF_PROVIDER, ONLY_SUPERADMIN, ALWAYS_OWN_USER, ONLY_OWN_USER } from '../../middleware/authChecker';
import { ProviderModel, Provider } from '../../../data/models/provider';
import { User, UserModel } from '../../../data/models/user';
import { ValidationError } from '../../../common/errors/index';

@Resolver(Provider)
export class ProviderResolver {
  @Authorized(ONLY_ADMINS_OF_PROVIDER)
  @Query(returns => Provider)
  async retrieveProvider(@Arg('providerId') providerId: string, @Ctx() ctx: MyContext) {
    const provider = await ProviderModel.findById(providerId).populate('admins').populate('coaches').populate('customers');
    return provider;
  }
}
