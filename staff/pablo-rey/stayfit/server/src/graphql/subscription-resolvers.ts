import { Query, Resolver } from 'type-graphql';
import { Subscription } from '../models/subscription';

@Resolver(Subscription)
export class SubscriptionResolver {
  @Query(returns => [Subscription])
  async subscriptions() {
    return [];
  }
}
