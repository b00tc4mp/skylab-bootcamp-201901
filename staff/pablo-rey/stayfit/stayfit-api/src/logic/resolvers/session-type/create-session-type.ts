import { Arg, Authorized, Ctx, Field, InputType, Mutation, Resolver } from 'type-graphql';
import { MyContext } from '../../middleware/MyContext';
import { ProviderModel } from '../../../data/models/provider';
import { SessionType, SessionTypeModel } from '../../../data/models/session-type';
import { ONLY_ADMINS_OF_PROVIDER } from '../../middleware/authChecker';

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
export class CreateSessionTypeResolver {
  @Authorized(ONLY_ADMINS_OF_PROVIDER)
  @Mutation(returns => SessionType)
  async createSessionType(
    @Arg('data') { type, title, providerId, active }: CreateSessionTypeInput,
    @Ctx() ctx: MyContext
  ) {
    const provider = ctx.provider || (await ProviderModel.findById(providerId));
    return await SessionTypeModel.create({ type, title, provider, active });
  }
}
