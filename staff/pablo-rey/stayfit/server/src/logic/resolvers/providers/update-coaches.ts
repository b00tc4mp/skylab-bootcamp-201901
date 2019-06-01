import { Types } from 'mongoose';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { MyContext } from '../../middleware/MyContext';
import { Provider, ProviderModel } from '../../../data/models/provider';
import { ONLY_ADMINS_OF_PROVIDER } from '../../middleware/authChecker';

@Resolver(Provider)
export class UpdateProviderCoachesResolver {
  @Authorized(ONLY_ADMINS_OF_PROVIDER)
  @Mutation(returns => Boolean)
  async updateProviderCoaches(
    @Arg('providerId') providerId: string,
    @Arg('usersId', () => [String]) coachesId: string[],
    @Ctx() ctx: MyContext
  ) {
    const provider = await ProviderModel.findById(providerId);
    provider!.coaches = coachesId.map(id => Types.ObjectId(id));
    await provider!.save();
    return true;
  }
}
