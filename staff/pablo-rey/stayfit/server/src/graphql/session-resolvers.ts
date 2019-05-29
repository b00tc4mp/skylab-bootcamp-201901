import { Query, Resolver } from 'type-graphql';
import sessionLogic from '../logic/sessions';
import { Session } from '../models/session';


@Resolver(Session)
export class SessionResolver {
  @Query(returns => [Session])
  async list() {
    return await sessionLogic.list();
  }
}
