import { Arg, Ctx, Field, ObjectType, Query, Resolver } from 'type-graphql';
import { LogicError } from '../../../../common/errors/index';
import { Attendance } from '../../../../data/models/attendance';
import { ProviderModel } from '../../../../data/models/provider';
import { Session, SessionModel } from '../../../../data/models/session';
import { User, UserModel } from '../../../../data/models/user';
import { MyContext } from '../../../middleware/MyContext';
import moment = require('moment');

@ObjectType()
export class SessionsWithMyAttendance {
  @Field()
  session: Session;

  @Field(() => Attendance, { nullable: true })
  myAttendance: Attendance | null;
}

@Resolver(User)
export class ListSessionsByUserResolvers {
  // @Authorized(ONLY_OWN_USER)
  /**
   * List the Next avaliable session for a provider of authenticated user
   * 
   * @param providerId 
   * @param day 
   * @param ctx 
   */
  @Query(returns => [SessionsWithMyAttendance])
  async listMyAvailableSessions(@Arg('providerId') providerId: string, @Arg('day') day: string, @Ctx() ctx: MyContext) {
    const user = ctx.user || (await UserModel.findById(ctx.userId));
    if (!user) throw new LogicError('user is required');

    const provider = ctx.provider || (await ProviderModel.findById(providerId, 'customers').populate('customers'));
    if (!provider) throw new LogicError('provider is required');

    const startDay = moment(day, 'YYYY-MM-DD').toDate();
    const endDay = moment(day, 'YYYY-MM-DD')
      .endOf('day')
      .toDate();
    let sessions = await SessionModel.find({ provider, startTime: { $gte: startDay, $lte: endDay } })
      .populate('coaches')
      .populate('type')
      .populate('provider')
      .populate('attendances');
    const result: any[] = [];
    for (let session of sessions) {
      const myAttendance = (session.attendances as Attendance[]).find(att => att.user.toString() === user.id.toString());
      result.push({ session, myAttendance });
    }
    return result;
  }
}

// function sessionAvailable (session : Session, user: User) {
//   if (session.availabilityStatus !== ACTIVE) return { available: false, message: session.status, paymentOptions: null};
//   if ()

// }
