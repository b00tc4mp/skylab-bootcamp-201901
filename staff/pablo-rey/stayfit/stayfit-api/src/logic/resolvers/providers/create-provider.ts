import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { MyContext } from '../../middleware/MyContext';
import { Provider, ProviderModel } from '../../../data/models/provider';
import { ONLY_SUPERADMIN } from '../../middleware/authChecker';

@Resolver(Provider)
export class CreateProviderResolver {
  @Authorized(ONLY_SUPERADMIN)
  @Mutation(returns => String)
  async createProvider(@Arg('name') name: string, @Ctx() ctx: MyContext) {
    const provider = await ProviderModel.create({ name, admins: [], coaches: [], customers: [] });
    return provider.id;
  }
}
