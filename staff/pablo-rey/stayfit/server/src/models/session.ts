import { Field, ID, ObjectType } from 'type-graphql';
import { arrayProp, instanceMethod, prop, Ref, Typegoose } from 'typegoose';
import { Attendance, AttendanceModel } from './attendance';
import { Provider } from './provider';
import { SessionType } from './session-type';
import { User } from './user';

export const ACTIVE = 'ACTIVE';
export const CANCELLED = 'CANCELLED';
export const FINISHED = 'FINISHED';
export const CLOSED = 'CLOSED';
export const FULL = 'FULL';

export const SESSIONSTATUS = [ACTIVE, CANCELLED, FINISHED, CLOSED, FULL];

export const PUBLIC = 'PUBLIC';
export const ONLY_REGISTERED = 'ONLY_REGISTERED';
export const OWN_CUSTOMERS = 'OWN_CUSTOMERS';
export const OWN_STAFF = 'OWN_STAFF';
export const PRIVATE = 'PRIVATE';

export const SESSIONVISIBILITY = [PUBLIC, ONLY_REGISTERED, OWN_CUSTOMERS, OWN_STAFF, PRIVATE];

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

  @Field(returns => [Attendance])
  @arrayProp({ itemsRef: Attendance, required: false})
  attendances: Ref<Attendance>[];

  @instanceMethod
  async countAttendances(): Promise<number> {
    const atts: Attendance[] = [];
    for (let attRef of this.attendances) {
      const att = await AttendanceModel.findById(attRef);
      atts.push(att!);
    }
    return Attendance.count(atts);
  }

  @Field()
  @prop({ required: true, enum: SESSIONSTATUS })
  status: string;

  @Field()
  @prop()
  get availabilityStatus(): string {
    if (this.isFull) return FULL;
    else return this.status;
  }

  @Field(returns => Boolean)
  @instanceMethod
  async isFull(): Promise<boolean> {
    const { attendances, maxAttendants } = this;
    if (maxAttendants >= (await this.countAttendances())) {
      return true;
    }
    return false;
  }

  @Field()
  @prop({ required: true, enum: SESSIONVISIBILITY })
  visibility: string;
}

export const SessionModel = new Session().getModelForClass(Session, {
  schemaOptions: { collection: 'sessions' },
});
