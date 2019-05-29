import { Field, ID, ObjectType, Root } from 'type-graphql';
import { arrayProp, instanceMethod, prop, Ref, Typegoose } from 'typegoose';
import { Provider, Provider__Type } from './provider';
import { SessionType, SessionType__Type } from './session-type';
import { User, UserType } from './user';
import { Types } from 'mongoose';

export const ACTIVE = 'ACTIVE';
export const CANCELLED = 'CANCELLED';
export const FINISHED = 'FINISHED';
export const CLOSED = 'CLOSED';

export const SESSIONSTATUS = [ACTIVE, CANCELLED, FINISHED, CLOSED];

export const PUBLIC = 'PUBLIC';
export const ONLY_REGISTERED = 'ONLY_REGISTERED';
export const OWN_CUSTOMERS = 'OWN_CUSTOMERS';
export const OWN_STAFF = 'OWN_STAFF';
export const PRIVATE = 'PRIVATE';

export const SESSIONVISIBILITY = [PUBLIC, ONLY_REGISTERED, OWN_CUSTOMERS, OWN_STAFF, PRIVATE];

export type Session__Type = {
  id?: string;
  _id?: Types.ObjectId;
  title: string;
  provider: Provider__Type;
  coaches: UserType[];
  startTime: Date;
  endTime: Date;
  maxAttendants: number;
  type: SessionType__Type;
  status: string;
  visibility: string;
};

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

  @Field()
  @instanceMethod
  date(@Root() parent: Session): Date {
    const { startTime: time } = parent;
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
  @prop({ required: true, enum: SESSIONSTATUS })
  status: string;

  @Field()
  @prop({ required: true, enum: SESSIONVISIBILITY })
  visibility: string;

  // @Field(returns => Attendance)
  // @arrayProp({ itemsRef: Attendance })
  // attendance: Ref<Attendance>[];
}

export const SessionModel = new Session().getModelForClass(Session, {
  schemaOptions: { collection: 'sessions' },
});
