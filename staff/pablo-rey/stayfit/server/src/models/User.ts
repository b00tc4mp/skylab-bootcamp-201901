import { Field, ID, ObjectType, Root } from 'type-graphql';
import { prop, Typegoose, arrayProp, Ref, instanceMethod, staticMethod, InstanceType } from 'typegoose';
import { isEmail } from 'validator';
import { Provider, ProviderModel } from './provider';
import { IsEmail } from 'class-validator';

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
  // @IsEmail()
  @prop({
    required: true,
    trim: true,
    // validate: [{ validator: email => isEmail(email), message: 'email not contains a valid email' }],
  })
  email: string;

  @prop({ required: true })
  password: string;

  @Field()
  @prop({ required: true, default: GUEST_ROLE, enum: ROLES })
  role: string;

  @prop({ default: '' })
  uploadedBanner: string;
  
  @Field(() => String)
  @prop() // this will create a virtual property called 'fullName'
  get bannerImageUrl() {
    return this.uploadedBanner || 'default' ;
  }
  set bannerImageUrl(img) {
    this.uploadedBanner = img;
  }

  @prop({ default: '' })
  uploadedPortrait: string;
  
  @Field(() => String)
  @prop() // this will create a virtual property called 'fullName'
  get portraitImageUrl() {
    return this.uploadedPortrait || 'default' ;
  }
  set portraitImageUrl(img) {
    this.uploadedPortrait = img;
  }

  @prop({ default: 0 })
  refreshTokenCount: number;

  @Field()
  fullName(@Root() parent: User): string {
    const user = (parent as any)._doc;
    return `${user.name} ${user.surname}`;
  }
}

export const UserModel = new User().getModelForClass(User, {
  schemaOptions: { collection: 'users' },
});
