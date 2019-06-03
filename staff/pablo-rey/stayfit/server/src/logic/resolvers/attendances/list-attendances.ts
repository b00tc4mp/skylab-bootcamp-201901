import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { MyContext } from '../../middleware/MyContext';
import { ONLY_ADMINS_OF_PROVIDER, ONLY_SUPERADMIN } from '../../middleware/authChecker';
import { ProviderModel } from '../../../data/models/provider';
import { User, UserModel } from '../../../data/models/user';
import { LogicError } from '../../../common/errors';
import { Attendance } from 'src/data/models/attendance';

@Resolver(User)
export class ListAttendancesResolvers {
  @Query(returns => [Attendance])
  async listAttendances(@Arg('userId') userId: string, @Arg('start') start: Date, @Arg('end') end: Date, @Ctx() ctx: MyContext) {
    // return await AttendanceModel.find();
  }

}


