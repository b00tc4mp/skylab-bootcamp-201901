import { Field, ID, ObjectType } from 'type-graphql';
import { arrayProp, prop, Ref, Typegoose } from 'typegoose';
import { Attendance } from './attendance';
import { User } from './user';

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
