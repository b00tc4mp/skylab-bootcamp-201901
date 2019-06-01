import { Types } from 'mongoose';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { MyContext } from '../../middleware/MyContext';
import { Provider, ProviderModel } from '../../../data/models/provider';
import { ONLY_SUPERADMIN } from '../../middleware/authChecker';

@Resolver(Provider)
export class UpdateProviderAdminsResolver {
  @Authorized(ONLY_SUPERADMIN)
  @Mutation(returns => Boolean)
  async updateProviderAdmins(
    @Arg('providerId') providerId: string,
    @Arg('usersId', () => [String]) adminsId: string[],
    @Ctx() ctx: MyContext
  ) {
    const provider = await ProviderModel.findById(providerId);
    provider!.admins = adminsId.map(id => Types.ObjectId(id));
    await provider!.save();

    return true;
  }
}
