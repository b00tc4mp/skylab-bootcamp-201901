import { Arg, Ctx, Field, InputType, Mutation, Resolver } from 'type-graphql';
import { MyContext } from './../../common/types/MyContext';
import { throwAuth } from './../../logic/authorization';
import { ProviderModel } from './../../models/provider';
import { SessionType, SessionTypeModel } from './../../models/session-type';

export const AUTH_SERVICETYPE_CREATE = 'AUTH_SERVICETYPE_CREATE';
export const AUTH_SERVICETYPE_RETRIEVE = 'AUTH_SERVICETYPE_RETRIEVE';
export const AUTH_SERVICETYPE_UPDATE = 'AUTH_SERVICETYPE_UPDATE';

@InputType()
export class CreateSessionTypeInput {
  @Field()
  type: string;

  @Field()
  title: string;

  @Field()
  providerId: string;

  @Field()
  active?: boolean;
}

@Resolver(SessionType)
export class SessionTypeResolver {
  @Mutation(returns => SessionType)
  async createSessionType(
    @Arg('data') { type, title, providerId, active }: CreateSessionTypeInput,
    @Ctx() ctx: MyContext
  ) {
    const provider = await ProviderModel.findById(providerId);
    await throwAuth(AUTH_SERVICETYPE_CREATE, { owner: ctx.user, provider });
    return await SessionTypeModel.create({ type, title, provider, active });
  }

  // @Query(returns => [SessionType])
  // async listSessionTypes(@Arg('providerId') providerId: string, @Ctx() ctx: MyContext) {
  //   return await SessionTypeModel.find({ provider: providerId });
  // }
}
