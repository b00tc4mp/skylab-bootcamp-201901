import { Types } from 'mongoose';
import { prop, Typegoose, Ref } from 'typegoose';
import { ObjectType, Field, ID, Root } from 'type-graphql';
import { User } from './user';
import { Service } from './service';

@ObjectType()
export class Attendance extends Typegoose {
  @Field(() => ID)
  id: number;

  @Field(returns => User)
  @prop({ ref: User, required: true })
  user: Ref<User>;

  @Field(returns => Service)
  @prop({ ref: Service, required: true })
  service: Ref<Service>;

  @Field()
  status: string;  // deleted | cancelled | noshow | free |  attended
}

export const AttendanceModel = new Attendance().getModelForClass(Attendance, {
  schemaOptions: { collection: 'attendances' },
});
