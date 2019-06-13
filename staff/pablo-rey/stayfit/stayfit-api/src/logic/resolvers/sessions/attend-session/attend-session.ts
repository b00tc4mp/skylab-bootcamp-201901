import { Provider } from './../../../../data/models/provider';
import { Session } from './../../../../data/models/session';
import { IsIn } from 'class-validator';
import { Arg, Authorized, Ctx, Field, InputType, Mutation, Resolver } from 'type-graphql';
import { isIn } from 'validator';
import { LogicError, ValidationError } from '../../../../common/errors/index';
import { Attendance, AttendanceModel } from '../../../../data/models/attendance';
import {
  ATTENDANCEPAYMENTTYPES,
  ATTENDANCESTATUSES,
  ATTENDED,
  CANCELLEDBYPROVIDER,
  CANCELLEDBYUSER,
  CONFIRMED,
  NOCOUNT,
  NOSHOW,
  OK,
  PENDINGAPPROVAL,
  PENDINGCANCELLATION,
  SUPERADMIN_ROLE
} from '../../../../data/enums';
import { SessionModel } from '../../../../data/models/session';
import { User, UserModel } from '../../../../data/models/user';
import { ALWAYS_OWN_CUSTOMER } from '../../../middleware/authChecker';
import { MyContext } from '../../../middleware/MyContext';
import { AuthorizationError } from './../../../../common/errors/index';

@InputType()
export class AttendanceInput {
  @Field()
  userId: string;

  @Field()
  sessionId: string;

  @Field()
  @IsIn(ATTENDANCEPAYMENTTYPES)
  paymentType: string;

  @Field({ nullable: true })
  @IsIn(ATTENDANCESTATUSES)
  status?: string;
}

function allowChangeStatusByUser(attendance: Attendance, newStatus: string) {
  if (isIn(newStatus, [CANCELLEDBYPROVIDER, NOSHOW, ATTENDED, NOCOUNT])) {
    throw new AuthorizationError(`user not allowed to push new status ` + newStatus);
  }
  if (isIn(attendance.status, [CANCELLEDBYPROVIDER, NOSHOW, ATTENDED, NOCOUNT])) {
    throw new AuthorizationError(`user not allowed to change previous ` + attendance.status);
  } else if (attendance.status === PENDINGCANCELLATION) {
    if (!isIn(newStatus, [CONFIRMED]))
      throw new AuthorizationError(`user not allowed to change previous ` + attendance.status);
  } else if (attendance.status === CONFIRMED) {
    if (!isIn(newStatus, [PENDINGCANCELLATION]))
      throw new AuthorizationError(`user not allowed to change previous ` + attendance.status);
  } else if (attendance.status === CANCELLEDBYUSER) {
    if (!isIn(newStatus, [(attendance.session as Session).attendanceDefaultStatus]))
      throw new AuthorizationError(`user not allowed to change previous ` + attendance.status);
  } else if (attendance.status === OK) {
    if (!isIn(newStatus, [CANCELLEDBYUSER]))
      throw new AuthorizationError(`user not allowed to change previous ` + attendance.status);
  } else if (attendance.status === PENDINGAPPROVAL) {
    if (!isIn(newStatus, [CANCELLEDBYUSER]))
      throw new AuthorizationError(`user not allowed to change previous ` + attendance.status);
  }
  return;
}

@Resolver(User)
export class AttendSessionResolvers {

  /**
   * Book a session with no previous attendance
   * 
   * @param param0 userId, sessionId, paymentType, status
   * @param ctx 
   */
  @Authorized(ALWAYS_OWN_CUSTOMER)
  @Mutation(returns => String)
  async attendSession(
    @Arg('data')
    { userId, sessionId, paymentType, status }: AttendanceInput,
    @Ctx() ctx: MyContext
  ) {
    const isUser = ctx.userId === userId;

    const user = await UserModel.findById(userId);
    if (!user) throw new LogicError('user is required');

    const session = await SessionModel.findById(sessionId).populate('attendances');
    if (!session) throw new LogicError('session is required');

    let defaultStatus = (session as Session).attendanceDefaultStatus;
    if (isUser && status && status !== defaultStatus) {
      throw new LogicError('user only can book with ' + defaultStatus);
    }
    if (isUser && defaultStatus) {
      status = defaultStatus;
    }

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
    } else {
      await this.updateStatusAttendance(attendance.id.toString(), status || defaultStatus, ctx);
    }

    return attendance.id;
  }

  /**
   * Update status of an attendance
   * 
   * @param attendanceId 
   * @param status 
   * @param ctx 
   */
  @Mutation(returns => Boolean)
  async updateStatusAttendance(
    @Arg('attendanceId') attendanceId: string,
    @Arg('status') status: string,
    @Ctx() ctx: MyContext
  ) {
    if (!isIn(status, ATTENDANCESTATUSES)) throw new ValidationError('status must be in enum');

    const attendance = await AttendanceModel.findById(attendanceId).populate({
      path: 'session',
      populate: { path: 'provider' },
    });
    if (!attendance) throw new LogicError('attendace is required');

    const isAdminOfThisAttendance = ((attendance.session as Session).provider as Provider).admins.find(
      id => id.toString() === ctx.userId
    );
    if (ctx.role !== SUPERADMIN_ROLE && attendance.user.toString() !== ctx.userId && !isAdminOfThisAttendance)
      throw new AuthorizationError('only own customer and admins can do that');

    const isUser = ctx.userId === attendance.user.toString();
    const isAdmin = !isUser;
    if (isUser) {
      allowChangeStatusByUser(attendance, status);
      attendance.status = status;
      await attendance.save();
      return true;
    } else if (isAdmin) {
      attendance.status = status;
      await attendance.save();
      return true;
    }
    return false;
  }

  /**
   * Updates the payment type of an attendance
   * 
   * @param attendanceId 
   * @param paymentType 
   * @param ctx 
   */

  @Authorized(ALWAYS_OWN_CUSTOMER)
  @Mutation(returns => Boolean)
  async updatePaymentTypeAttendance(
    @Arg('attendanceId') attendanceId: string,
    @Arg('paymentType') paymentType: string,
    @Ctx() ctx: MyContext
  ) {
    if (!isIn(paymentType, ATTENDANCEPAYMENTTYPES)) throw new ValidationError('paymentType must be in enum');

    const attendance = await AttendanceModel.findById(attendanceId);
    if (!attendance) throw new LogicError('attendace is required');

    attendance.paymentType = paymentType;
    await attendance.save();

    return true;
  }
}
