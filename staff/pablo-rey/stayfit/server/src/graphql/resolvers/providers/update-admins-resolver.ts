import { Types } from 'mongoose';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { MyContext } from '../../../common/types/MyContext';
import { Provider, ProviderModel } from '../../../models/provider';
import { ONLY_SUPERADMIN } from './../../middleware/authChecker';
import users from 'src/logic/users';
import { User, UserModel } from 'src/models/user';

@Resolver(Provider)
export class UpdateProviderAdminsResolver {
  @Authorized(ONLY_SUPERADMIN)
  @Mutation(returns => Boolean)
  async updateProviderAdmins(
    @Arg('providerId') providerId: string,
    @Arg('usersId', () => [String]) usersId: string[],
    @Ctx() ctx: MyContext
  ) {
    const provider = await ProviderModel.findById(providerId);
    provider!.admins = usersId.map(id => Types.ObjectId(id));
    await provider!.save();

    return true;
  }
}
