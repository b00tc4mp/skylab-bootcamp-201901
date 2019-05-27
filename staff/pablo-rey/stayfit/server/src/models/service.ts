import { Types } from 'mongoose';
import { prop, Typegoose, Ref, arrayProp } from 'typegoose';
import { ObjectType, Field, ID, Root } from 'type-graphql';
import { User } from './user';
import { Attendance } from './attendance';

@ObjectType()
export class Service extends Typegoose {
  @Field(() => ID)
  id: number;

  @Field(returns => User)
  @prop({ ref: User, required: true })
  owner: Ref<User>;

  @Field()
  @prop({ required: true })
  date: Date;

  @Field()
  @prop({ required: true })
  startTime: Date;

  @Field()
  @prop({ required: true })
  endTime: Date;

  @Field(returns => User)
  @prop({ ref: User })
  staff: Ref<User>[];

  @Field(returns => String)
  @prop({ required: true })
  type: string[];

  @Field()
  @prop({ required: true })
  title: string;

  @Field()
  @prop({ required: true })
  maxUsers: number;

  @Field(returns => Attendance)
  @arrayProp({ itemsRef: Attendance })
  attendants: Ref<Attendance>[];
}

export const ServiceModel = new Service().getModelForClass(Service, {
  schemaOptions: { collection: 'services' },
});
