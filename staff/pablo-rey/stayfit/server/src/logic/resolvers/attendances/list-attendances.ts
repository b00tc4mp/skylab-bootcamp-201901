import * as moment from 'moment';
import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { ProviderModel } from '../../../data/models/provider';
import { UserModel, User } from '../../../data/models/user';
import { ONLY_IF_MY_CUSTOMER } from '../../../logic/middleware/authChecker';
import { MyContext } from '../../middleware/MyContext';
import { SessionsWithMyAttendance } from '../sessions/list-sessions/list-sessions-users';
import { LogicError } from './../../../common/errors/index';
import { AttendanceModel } from './../../../data/models/attendance';

@Resolver(User)
export class ListAttendancesResolvers {
  @Query(returns => [SessionsWithMyAttendance])
  async listMyNextAttendances(@Arg('end', { nullable: true }) endDate: Date, @Ctx() ctx: MyContext) {
    const userId = ctx.userId;
    const start = moment()
      .startOf('day')
      .toDate();
    const end =
      endDate ||
      moment()
        .add(10, 'days')
        .endOf('day')
        .toDate();

    let attendances = await AttendanceModel.find({ user: userId }).populate({
      path: 'session',
      match: { startTime: { $gte: start, $lte: end } },
      populate: { path: 'coaches type provider attendances' },
    });
    attendances = await attendances.filter((att: any) => att.session);
    return attendances.map(att => ({ myAttendance: att, session: att.session }));
  }

  @Authorized(ONLY_IF_MY_CUSTOMER)
  @Query(returns => [SessionsWithMyAttendance])
  async listAttendances(@Arg('userId') userId: string, @Arg('providerId') providerId: string) {
    let attendances = await AttendanceModel.find({ user: userId }).populate({
      path: 'session',
      populate: { path: 'coaches type provider attendances' },
    });
    return attendances.map(att => ({ myAttendance: att, session: att.session }));
  }
}
