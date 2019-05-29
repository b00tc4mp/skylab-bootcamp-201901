import { Query, Resolver } from 'type-graphql';
import { Session } from '../models/session';
import { SessionModel } from './../models/session';

@Resolver(Session)
export class SessionResolver {
  @Query(returns => [Session])
  async listSessions() {
    return await SessionModel.find();
  }
}
