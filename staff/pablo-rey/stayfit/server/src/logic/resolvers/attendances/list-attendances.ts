import { AttendanceModel } from './../../../data/models/attendance';
import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { MyContext } from '../../middleware/MyContext';
import { ONLY_ADMINS_OF_PROVIDER, ONLY_SUPERADMIN, ONLY_OWN_USER } from '../../middleware/authChecker';
import { ProviderModel } from '../../../data/models/provider';
import { User, UserModel } from '../../../data/models/user';
import { LogicError } from '../../../common/errors';
import { Attendance } from '../../../data/models/attendance';
import * as moment from 'moment';
import { SessionModel } from '../../../data/models/session';

@Resolver(User)
export class ListAttendancesResolvers {
  @Query(returns => [Attendance])
  async listMyAttendances(@Arg('end', { nullable: true }) endDate: Date, @Ctx() ctx: MyContext) {
    const userId = ctx.userId;
    const start = moment().toDate();
    const end =
      endDate ||
      moment()
        .add(10, 'days')
        .endOf('day')
        .toDate();

    let attendances = await AttendanceModel.find({ user: userId }).populate({
      path: 'session',
      match: { startTime: { $gte: start , $lte: end } },
    });
    attendances = await attendances.filter((att: any) => att.session);
    return attendances;
  }
}
