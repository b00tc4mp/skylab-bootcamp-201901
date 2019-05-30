import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { MyContext } from '../../../common/types/MyContext';
import { Provider, ProviderModel } from '../../../models/provider';
import { checkAuth } from '../../authorization';
import { Types } from 'mongoose';
import { arrayProp } from 'typegoose';

export const AUTH_PROVIDERS_UPDATEADMINS = 'AUTH_PROVIDERS_UPDATEADMINS';

@Resolver(Provider)
export class UpdateProviderAdminsResolver {
  @Mutation(returns => Boolean)
  async updateProviderAdmins(
    @Arg('providerId') providerId: string,
    @Arg('usersId') usersId: string[], //FIXME: its an array
    @Ctx() ctx: MyContext
  ) {
    const provider = await ProviderModel.findById(providerId);
    await checkAuth(AUTH_PROVIDERS_UPDATEADMINS, { owner: ctx.userId, provider });

    provider!.admins = usersId.map(id => Types.ObjectId(id));
    await provider!.save();
    return true;
  }
}
