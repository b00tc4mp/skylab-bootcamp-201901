import { Mutation, Query, Resolver, Arg } from 'type-graphql';
import { SessionType, SessionTypeModel } from '../models/session-type';

@Resolver(SessionType)
export class SessionTypeResolver {
  @Query(returns => [SessionType])
  async listSessionTypes() {
    return await SessionTypeModel.find();
  }

  @Mutation(returns => SessionType)
  async createSessionType(@Arg('type') type: string, @Arg('title') title: string) {
    return await SessionTypeModel.create({ type, title });
  }
}
