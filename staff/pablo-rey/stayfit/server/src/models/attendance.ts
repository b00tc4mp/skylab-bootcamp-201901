import { Field, ID, ObjectType } from 'type-graphql';
import { prop, Ref, Typegoose } from 'typegoose';
import { Service } from './service';
import { User } from './user';

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
  status: string; // deleted | cancelled | noshow | free |  attended
}

export const AttendanceModel = new Attendance().getModelForClass(Attendance, {
  schemaOptions: { collection: 'attendances' },
});
