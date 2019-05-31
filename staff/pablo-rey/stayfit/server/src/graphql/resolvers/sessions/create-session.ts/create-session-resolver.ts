import { IsIn, IsNotEmpty } from 'class-validator';
import { Arg, Authorized, Ctx, Field, InputType, Mutation, Resolver } from 'type-graphql';
import { MyContext } from '../../../../common/types/MyContext';
import { Provider, ProviderModel } from '../../../../models/provider';
import { LogicError } from './../../../../common/errors';
import { SessionModel, SESSIONSTATUS, SESSIONVISIBILITY } from './../../../../models/session';
import { UserModel, User } from './../../../../models/user';
import { ONLY_ADMINS_OF_PROVIDER } from './../../../middleware/authChecker';
import { SessionTypeModel } from '../../../../models/session-type';

@InputType()
export class CreateSessionInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsNotEmpty()
  providerId: string;

  @Field(() => [String])
  coachesId: string[];

  @Field(() => Date)
  startTime: Date;

  @Field(() => Date)
  endTime: Date;

  @Field()
  maxAttendants: number;

  @Field()
  typeId: string;

  @Field()
  @IsIn(SESSIONSTATUS)
  status: string;

  @Field()
  @IsIn(SESSIONVISIBILITY)
  visibility: string;
}

@Resolver(Provider)
export class CreateSessionResolver {
  @Authorized(ONLY_ADMINS_OF_PROVIDER)
  @Mutation(returns => String)
  async createSession(@Arg('data') data: CreateSessionInput, @Ctx() ctx: MyContext) {
    const { title, providerId, coachesId, startTime, endTime, maxAttendants, typeId, status, visibility } = data;
    const provider = ctx.provider || (await ProviderModel.findById(providerId));
    if (!provider) throw new LogicError('provider is required');
    let coaches: User[] = [];
    if (coachesId && coachesId.length) {
      for (let id of coachesId) {
        const coach = await UserModel.findById(id);
        if (!coach) throw new LogicError(`id ${id} not exist`);
        coaches.push(coach);
      }
    }
    const _type = await SessionTypeModel.findById(typeId);
    if (!_type) throw new LogicError('SessionType is required')

    const session = await SessionModel.create({title, provider, coaches, startTime,endTime, maxAttendants, type: _type, status, visibility });
    return session.id;
  }
}
