import { Resolver, Query, Mutation, Arg, Root } from 'type-graphql';
import { Service } from './../models/service';
import { User } from 'src/models/user';

import serviceLogic from '../logic/services'

@Resolver(Service)
export class ServiceResolver {
  @Query(returns => [Service])
  async services() {
    return await serviceLogic.list();
  }
}
