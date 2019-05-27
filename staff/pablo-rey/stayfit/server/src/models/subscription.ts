import { Types } from 'mongoose';
import { prop, Typegoose, Ref, arrayProp } from 'typegoose';
import { ObjectType, Field, ID, Root } from 'type-graphql';
import { User } from './user';
import { Service } from './service';
import { Attendance } from './attendance';

@ObjectType()
export class ServiceLimit extends Typegoose {
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

  @Field(() => ServiceLimit)
  @arrayProp({ items: ServiceLimit })
  serviceLimits: ServiceLimit[];
  /*

  serviceLimits: {
      "wod": {limit : 10, attendance: [Attendances]}
      "mobility": {limit : 2, attendance: [Attendances]}
  }
*/
}

export const SubscriptionModel = new Subscription().getModelForClass(Subscription, {
  schemaOptions: { collection: 'suscriptions' },
});
