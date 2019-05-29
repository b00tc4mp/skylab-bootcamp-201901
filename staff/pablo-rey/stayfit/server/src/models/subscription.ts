import { Field, ID, ObjectType } from 'type-graphql';
import { arrayProp, prop, Ref, Typegoose } from 'typegoose';
import { Attendance } from './attendance';

@ObjectType()
export class SessionsLimit extends Typegoose {
  @Field()
  @prop()
  type: string;

  @Field()
  @prop()
  limit: number;

  @Field(() => Attendance)
  @arrayProp({ itemsRef: Attendance })
  attendance: Ref<Attendance>[];
}

@ObjectType()
export class Subscription extends Typegoose {
  @Field(() => ID)
  id: number;

  @Field()
  status: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field(() => SessionsLimit)
  @arrayProp({ items: SessionsLimit })
  sessionsLimit: SessionsLimit[];
  /*

  sessionsLimit: {
      "wod": {limit : 10, attendance: [Attendances]}
      "mobility": {limit : 2, attendance: [Attendances]}
  }
*/
}

export const SubscriptionModel = new Subscription().getModelForClass(Subscription, {
  schemaOptions: { collection: 'suscriptions' },
});
