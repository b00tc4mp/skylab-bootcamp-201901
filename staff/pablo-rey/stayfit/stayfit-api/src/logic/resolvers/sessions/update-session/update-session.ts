import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { LogicError } from '../../../../common/errors';
import { Provider, ProviderModel } from '../../../../data/models/provider';
import { SessionModel } from '../../../../data/models/session';
import { SessionTypeModel } from '../../../../data/models/session-type';
import { UserModel } from '../../../../data/models/user';
import { ONLY_ADMINS_OF_PROVIDER } from '../../../middleware/authChecker';
import { MyContext } from '../../../middleware/MyContext';
import { CreateSessionsInput } from '../create-session/create-session';
import { AttendanceModel } from './../../../../data/models/attendance';

@Resolver(Provider)
export class UpdateSessionResolver {
  @Authorized(ONLY_ADMINS_OF_PROVIDER)
  @Mutation(returns => Boolean)
  async updateSession(
    @Arg('sessionId') sessionId: string,
    @Arg('data') data: CreateSessionsInput,
    @Ctx() ctx: MyContext
  ) {
    const { providerId, coachesId, typeId, title, startTime, endTime, maxAttendants, visibility, notes, status } = data;

    const session = await SessionModel.findById(sessionId);
    if (!session) throw new LogicError('session not found');

    const provider = ctx.provider || (await ProviderModel.findById(providerId));
    if (!provider) throw new LogicError('provider is required');

    const coaches = await UserModel.find({ _id: coachesId });

    const type = await SessionTypeModel.findById(typeId);
    if (!type) throw new LogicError('SessionType is required');

    session.title = title;
    session.provider = provider;
    session.coaches = coaches;
    session.startTime = startTime;
    session.endTime = endTime;
    session.maxAttendants = maxAttendants;
    session.type = type;
    session.status = status;
    session.visibility = visibility;
    session.notes = notes;
    await session.save();
    return true;
  }

  @Authorized(ONLY_ADMINS_OF_PROVIDER)
  @Mutation(returns => Boolean)
  async deleteSession(@Arg('sessionId') sessionId: string, @Arg('providerId') providerId: string,@Ctx() ctx: MyContext) {
    const session = await SessionModel.findById(sessionId);
    if (!session) throw new LogicError('session not found');

    await AttendanceModel.deleteMany({ _id: session.attendances });
    await SessionModel.findByIdAndDelete(session.id);
    return true;
  }
}
