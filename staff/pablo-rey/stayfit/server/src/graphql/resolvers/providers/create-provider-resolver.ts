import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { MyContext } from '../../../common/types/MyContext';
import { Provider, ProviderModel } from '../../../models/provider';
import { checkAuth } from '../../authorization';

export const AUTH_PROVIDERS_CREATE = 'AUTH_PROVIDERS_CREATE';

@Resolver(Provider)
export class CreateProviderResolver {
  @Mutation(returns => String)
  async createProvider(@Arg('name') name: string, @Ctx() ctx: MyContext) {
    await checkAuth(AUTH_PROVIDERS_CREATE, { owner: ctx.userId });

    const provider = await ProviderModel.create({ name, admins: [], coaches: [], customers: [] });
    return provider.id;
  }
}
