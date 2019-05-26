import { Types } from 'mongoose';
import { prop, Typegoose } from 'typegoose';
import { isEmail } from 'validator';
import { ObjectType, Field, ID, Root } from 'type-graphql';

// Constants
export const SUPERADMIN_ROLE = 'SUPERADMIN_ROLE';
export const BUSINESS_ROLE = 'BUSINESS_ROLE';
export const ADMIN_ROLE = 'ADMIN_ROLE';
export const STAFF_ROLE = 'STAFF_ROLE';
export const USER_ROLE = 'USER_ROLE';
export const GUEST_ROLE = 'GUEST_ROLE';
export const ROLES = [
  SUPERADMIN_ROLE,
  BUSINESS_ROLE,
  ADMIN_ROLE,
  STAFF_ROLE,
  USER_ROLE,
  GUEST_ROLE,
];

export type UserType = {
  id?: Types.ObjectId | string;
  _id?: Types.ObjectId;
  name: string;
  surname: string;
  email: string;
  password?: string;
  role: string;
};

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

  @prop({ required: true, default: GUEST_ROLE, enum: ROLES })
  role: string;

  @Field()
  fullName(@Root() parent: User): string {
    return `${parent.name} ${parent.surname}`;
  }
}

export const UserModel = new User().getModelForClass(User, {
  schemaOptions: { collection: 'users' },
});
