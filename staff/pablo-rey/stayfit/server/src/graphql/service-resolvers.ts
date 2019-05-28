import { Query, Resolver } from 'type-graphql';
import serviceLogic from '../logic/services';
import { Service } from './../models/service';


@Resolver(Service)
export class ServiceResolver {
  @Query(returns => [Service])
  async services() {
    return await serviceLogic.list();
  }
}
