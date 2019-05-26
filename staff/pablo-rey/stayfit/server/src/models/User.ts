import { prop, Typegoose } from 'typegoose';
import { isEmail } from 'validator';

export class UserSchema extends Typegoose {
  @prop({ required: true, trim: true})
  name: string;
  @prop({ required: true, trim: true })
  surname: string;
  @prop({ required: true, unique: true, trim: true, validate: [ {validator:(email) => isEmail(email), message: 'email not contains a valid email'}] })
  email: string;
  @prop({ required: true })
  password: string;
}

export const User = new UserSchema().getModelForClass(UserSchema, {
  schemaOptions: { collection: 'users' },
});
