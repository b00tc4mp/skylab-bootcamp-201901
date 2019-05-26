import { prop, Typegoose } from 'typegoose';
import { isEmail } from 'validator';
import { ObjectType, Field, ID, Root } from 'type-graphql';

@ObjectType()
export class User extends Typegoose {
  @Field(() => ID)
  id: number;

  @Field()
  @prop({ required: true, trim: true })
  name: string;

  @Field()
  @prop({ required: true, trim: true })
  surname: string;

  @Field()
  @prop({
    required: true,
    unique: true,
    trim: true,
    validate: [{ validator: email => isEmail(email), message: 'email not contains a valid email' }],
  })
  email: string;

  @Field()
  fullName(@Root() parent: User): string {
    return `${parent.name} ${parent.surname}`;
  }

  @prop({ required: true })
  password: string;
}

export const UserModel = new User().getModelForClass(User, {
  schemaOptions: { collection: 'users' },
});
