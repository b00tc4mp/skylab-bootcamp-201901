import { Field, ID, ObjectType } from 'type-graphql';
import { prop, Ref, staticMethod, Typegoose } from 'typegoose';
import { ATTENDANCECOUNTSTATUSES, ATTENDANCEPAYMENTTYPES, ATTENDANCESTATUSES } from '../enums';
import { Session } from './session';
import { User } from './user';


@ObjectType()
export class Attendance extends Typegoose {
  @Field(() => ID)
  id: number;

  @Field(returns => User)
  @prop({ ref: { name: 'User' }, required: true })
  user: Ref<User>;

  @Field(returns => Session)
  @prop({ ref: { name: 'Session' }, required: true })
  session: Ref<Session>;

  @Field()
  @prop({ enum: ATTENDANCEPAYMENTTYPES })
  paymentType: string;

  @Field()
  @prop({ enum: ATTENDANCESTATUSES })
  status: string;

  @staticMethod
  static count(attendances: Attendance[] | null): number {
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
