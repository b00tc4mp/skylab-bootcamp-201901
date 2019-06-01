import { IsIn } from 'class-validator';
import { Arg, Authorized, Ctx, Field, InputType, Mutation, Resolver } from 'type-graphql';
import { MyContext } from '../../../../common/types/MyContext';
import { User, UserModel } from '../../../../models/user';
import { LogicError, ValidationError } from './../../../../common/errors/index';
import {
  ATTENDANCEPAYMENTTYPES,
  ATTENDANCESTATUSES,
  Attendance,
  AttendanceModel,
  CANCELLEDBYPROVIDER,
  CANCELLEDBYUSER,
} from './../../../../models/attendance';
import { SessionModel } from './../../../../models/session';
import { ALWAYS_OWN_CUSTOMER } from './../../../middleware/authChecker';
import { isIn } from 'validator';

@InputType()
export class AttendanceInput {
  @Field()
  userId: string;

  @Field()
  sessionId: string;

  @Field()
  @IsIn(ATTENDANCEPAYMENTTYPES)
  paymentType: string;

  @Field()
  @IsIn(ATTENDANCESTATUSES)
  status: string;
}

@Resolver(User)
export class AttendSessionResolvers {
  @Authorized(ALWAYS_OWN_CUSTOMER)
  @Mutation(returns => String)
  async attendSession(
    @Arg('data')
    { userId, sessionId, paymentType, status }: AttendanceInput,
    @Ctx() ctx: MyContext
  ) {
    const user = await UserModel.findById(userId);
    if (!user) throw new LogicError('user is required');

    const session = await SessionModel.findById(sessionId).populate('attendances');
    if (!session) throw new LogicError('session is required');

    let attendance = (session.attendances as Attendance[]).find(att => att.user.toString() === userId);

    if (!attendance) {
      attendance = await AttendanceModel.create({
        user: user.id,
        session: session._id,
        paymentType,
        status,
      });
      session.attendances.push(attendance);
      await session.save();
    }

    return attendance.id;
  }

  @Authorized(ALWAYS_OWN_CUSTOMER)
  @Mutation(returns => Boolean)
  async updateStatusAttendance(
    @Arg('attendanceId') attendanceId: string,
    @Arg('status')  status: string,
    @Ctx() ctx: MyContext
  ) {
    if (!isIn(status, ATTENDANCESTATUSES)) throw new ValidationError('status must be in enum')

    const attendance = await AttendanceModel.findById(attendanceId);
    if (!attendance) throw new LogicError('attendace is required');

    attendance.status = status;
    await attendance.save();

    return true;
  }

  @Authorized(ALWAYS_OWN_CUSTOMER)
  @Mutation(returns => Boolean)
  async updatePaymentTypeAttendance(
    @Arg('attendanceId') attendanceId: string,
    @Arg('paymentType') paymentType: string,
    @Ctx() ctx: MyContext
  ) {
    if (!isIn(paymentType, ATTENDANCEPAYMENTTYPES)) throw new ValidationError('paymentType must be in enum')

    const attendance = await AttendanceModel.findById(attendanceId);
    if (!attendance) throw new LogicError('attendace is required');

    attendance.paymentType = paymentType;
    await attendance.save();

    return true;
  }
}