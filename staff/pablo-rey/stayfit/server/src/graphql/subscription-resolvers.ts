import { Resolver, Query, Mutation, Arg, Root } from 'type-graphql';
import { Service } from '../models/service';
import { User } from 'src/models/user';

import serviceLogic from '../logic/services'
import { Subscription } from '../models/subscription';

@Resolver(Subscription)
export class SubscriptionResolver {
  @Query(returns => [Subscription])
  async subscriptions() {
    return [];
  }
}
