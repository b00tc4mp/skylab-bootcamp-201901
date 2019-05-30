import { Field, ID, ObjectType, Root } from 'type-graphql';
import { prop, Typegoose, arrayProp, Ref } from 'typegoose';
import { isEmail } from 'validator';
import { Provider } from './provider';

// Constants
export const SUPERADMIN_ROLE = 'SUPERADMIN_ROLE';
export const BUSINESS_ROLE = 'BUSINESS_ROLE';
export const ADMIN_ROLE = 'ADMIN_ROLE';
export const STAFF_ROLE = 'STAFF_ROLE';
export const USER_ROLE = 'USER_ROLE';
export const GUEST_ROLE = 'GUEST_ROLE';
export const ROLES = [SUPERADMIN_ROLE, BUSINESS_ROLE, ADMIN_ROLE, STAFF_ROLE, USER_ROLE, GUEST_ROLE];

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

  @prop({ required: true })
  password: string;

  @Field()
  @prop({ required: true, default: GUEST_ROLE, enum: ROLES })
  role: string;

  @prop({ default: 0})
  refreshTokenCount: number

  @Field()
  fullName(@Root() parent: User): string {
    return `${parent.name} ${parent.surname}`;
  }

}

export const UserModel = new User().getModelForClass(User, {
  schemaOptions: { collection: 'users' },
});
