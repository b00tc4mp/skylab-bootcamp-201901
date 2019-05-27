import { Resolver, Query, Mutation, Arg, Root, Field } from 'type-graphql';

import providersLogic from '../logic/providers';
import { Provider } from '../models/provider';

@Resolver(Provider)
export class ProviderResolver {
  @Query(returns => [Provider])
  async providersList() {
    return [];
  }

  @Mutation(returns => Provider)
  async createProvider(@Arg('name') name: string): Promise<Provider> {
    return providersLogic.create({ name });
  }

  @Mutation(returns => Provider)
  async updateAdmins(
    @Arg('providerId') providerId: string,
    @Arg('admins',  type => String, { nullable: 'items' }) admins: string[]
  ): Promise<Provider> {
    return providersLogic.updateAdmins(providerId, admins);
  }
}
