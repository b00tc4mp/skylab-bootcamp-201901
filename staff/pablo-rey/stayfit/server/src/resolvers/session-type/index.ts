import { Mutation, Query, Resolver, Arg, Ctx } from 'type-graphql';
import { SessionType, SessionTypeModel } from './../../models/session-type'
import { MyContext } from './../../common/types/MyContext';

@Resolver(SessionType)
export class SessionTypeResolver {
  @Query(returns => [SessionType])
  async listSessionTypes( @Ctx() ctx: MyContext) {
    return await SessionTypeModel.find();
  }

  @Mutation(returns => SessionType)
  async createSessionType(@Arg('type') type: string, @Arg('title') title: string) {
    return await SessionTypeModel.create({ type, title });
  }
}
