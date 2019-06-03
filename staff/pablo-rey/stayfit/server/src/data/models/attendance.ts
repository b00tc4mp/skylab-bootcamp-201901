import { Field, ID, ObjectType } from 'type-graphql';
import { prop, Ref, Typegoose, staticMethod } from 'typegoose';
import { Session } from './session';
import { User } from './user';

export const PAIDINADVANCE = 'PAIDINADVANCE';
export const TOPAYINSESSION = 'TOPAYINSESSION';
export const POSTPAID = 'POSTPAID';
export const INCLUDED = 'INCLUDED';
export const FREE = 'FREE';

export const ATTENDANCEPAYMENTTYPES = [PAIDINADVANCE, TOPAYINSESSION, POSTPAID, INCLUDED, FREE];

export const CANCELLEDBYPROVIDER = 'CANCELLEDBYPROVIDER';
export const CANCELLEDBYUSER = 'CANCELLEDBYUSER';
export const CONFIRMED = 'CONFIRMED';
export const NOSHOW = 'NOSHOW';
export const ATTENDED = 'ATTENDED';
export const PENDINGAPPROVAL = 'PENDINGAPPROVAL';
export const NOCOUNT = 'NOCOUNT';

export const ATTENDANCESTATUSES = [
  CANCELLEDBYPROVIDER,
  CANCELLEDBYUSER,
  CONFIRMED,
  NOSHOW,
  ATTENDED,
  PENDINGAPPROVAL,
  NOCOUNT,
];
export const ATTENDANCECOUNTSTATUSES = [CONFIRMED, NOSHOW, ATTENDED, PENDINGAPPROVAL];
export const ATTENDANCENOCOUNTSTATUSES = [CANCELLEDBYPROVIDER, CANCELLEDBYUSER, NOCOUNT];

@ObjectType()
export class Attendance extends Typegoose {
  @Field(() => ID)
  id: number;

  @Field(returns => User)
  @prop({ ref: User, required: true })
  user: Ref<User>;

  @Field(returns => Session)
  @prop({ ref: Session, required: true })
  session: Ref<Session>;

  @Field()
  @prop({ enum: ATTENDANCEPAYMENTTYPES })
  paymentType: string;

  @Field()
  @prop({ enum: ATTENDANCESTATUSES })
  status: string;

  @staticMethod
  static count(attendances: Attendance[] | null) : number {
    if (!attendances || attendances.length === 0) return 0;
    return attendances.reduce(
      (acc, attendance) => acc + (ATTENDANCECOUNTSTATUSES.includes(attendance!.status) ? 1 : 0),
      0
    );
  }
}

export const AttendanceModel = new Attendance().getModelForClass(Attendance, {
  schemaOptions: { collection: 'attendances' },
});
