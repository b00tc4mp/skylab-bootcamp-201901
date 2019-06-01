import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { ValidationError } from '../../../common/errors';
import { MyContext } from '../../../common/types/MyContext';
import { Provider, ProviderModel } from '../../../models/provider';
import { UserModel } from '../../../models/user';
import { ONLY_ADMINS_OF_PROVIDER } from './../../middleware/authChecker';

@Resolver(Provider)
export class RemoveProviderCustomerResolver {
  @Authorized(ONLY_ADMINS_OF_PROVIDER)
  @Mutation(returns => Boolean)
  async removeProviderCustomer(
    @Arg('providerId') providerId: string,
    @Arg('userId') userId: string,
    @Ctx() ctx: MyContext
  ) {
    const user = await UserModel.findById(userId);
    if (!user) throw new ValidationError('user is required');

    const provider = await ProviderModel.findById(providerId);
    if (!provider!.isCustomer(user)) return false;
    provider!.customers = provider!.customers.filter(customer => customer.toString() !== userId);
    await provider!.save();
    return true;
  }
}
