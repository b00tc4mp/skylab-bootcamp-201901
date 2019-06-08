import { Field, ID, ObjectType } from 'type-graphql';
import { arrayProp, instanceMethod, prop, Ref, Typegoose } from 'typegoose';
import { Attendance, AttendanceModel } from './attendance';
import { Provider } from './provider';
import { SessionType } from './session-type';
import { User } from './user';

import {
  ACTIVE,
  CANCELLED,
  FINISHED,
  CLOSED,
  FULL,
  SESSIONSTATUS,
  PUBLIC,
  ONLY_REGISTERED,
  OWN_CUSTOMERS,
  OWN_STAFF,
  PRIVATE,
  SESSIONVISIBILITY,
  ATTENDANCESTATUSES,
  OK,
} from '../enums';

@ObjectType()
export class Session extends Typegoose {
  @Field(() => ID)
  id: number;

  @Field()
  @prop({ required: true })
  title: string;

  @Field(returns => Provider)
  @prop({ ref: Provider, required: true })
  provider: Ref<Provider>;

  @Field(returns => [User], { nullable: 'items' })
  @arrayProp({ itemsRef: User })
  coaches: Ref<User>[];

  @prop()
  get day(): Date {
    const { startTime: time } = this;
    return new Date(time.getFullYear(), time.getMonth(), time.getDate());
  }

  @Field()
  @prop({ required: true })
  startTime: Date;

  @Field()
  @prop({ required: true })
  endTime: Date;

  @Field()
  @prop({ required: true })
  maxAttendants: number;

  @Field(returns => SessionType)
  @prop({ ref: SessionType, required: true })
  type: Ref<SessionType>;

  @Field()
  @prop({ required: false, enum: ATTENDANCESTATUSES, default: OK })
  attendanceDefaultStatus: string;

  @Field(returns => [Attendance])
  @arrayProp({ itemsRef: Attendance, required: false })
  attendances: Ref<Attendance>[];

  @Field()
  @prop()
  get countAttendances(): number {
    const atts: Attendance[] = (this as any)._doc.attendances;
    return Attendance.count(atts);
  }

  @Field()
  @prop({ required: true, enum: SESSIONSTATUS })
  status: string;

  @Field()
  @prop({ required: true, enum: SESSIONVISIBILITY })
  visibility: string;
}

export const SessionModel = new Session().getModelForClass(Session, {
  schemaOptions: { collection: 'sessions' },
});
