import { Field, ID, ObjectType, Root } from 'type-graphql';
import { prop, Ref, Typegoose, arrayProp } from 'typegoose';
import { Provider } from './provider'
import moment = require('moment');

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

  @Field(returns => [Provider], { nullable: 'items' })
  @arrayProp({ itemsRef: Provider })
  customerOf: Ref<Provider>[];

  @Field(returns => [Provider], { nullable: 'items' })
  @arrayProp({ itemsRef: Provider })
  coachOf: Ref<Provider>[];

  @Field(returns => [Provider], { nullable: 'items' })
  @arrayProp({ itemsRef: Provider })
  adminOf: Ref<Provider>[];

  

  // // *+++++++++++++++++++++++++++++++++ Suscriptions not working yet
  // @Field(returns => Subscription)
  // @arrayProp({ itemsRef: Subscription })
  // subscriptions:Subscription[];

  // @instanceMethod
  // activeSubscriptions(sessionType: SessionType, _date: Date = new Date()) {
  //   const active: Subscription[] = [];
  //   for (let sub of this.subscriptions) {
  //     if (sub.active && moment(_date).isBetween(sub.startDate, sub.endDate) && !sub.used) {
  //       const sl = sub.sessionsLimit.find(sl => sl.type === sessionType);
  //       if (sl && !sl.used) active.push(sub);
  //     }
  //   }
  //   return active.sort((a, b) => (a.paymentType > b.paymentType ? 1 : -1));
  // }

  // @instanceMethod
  // attend(session: Session) {
  //   const attendance =
  // }

  @prop({ default: '' })
  uploadedBanner: string;

  @Field(() => String)
  @prop() // this will create a virtual property called 'fullName'
  get bannerImageUrl() : string {
    return this.uploadedBanner || 'default';
  }
  set bannerImageUrl(img) {
    this.uploadedBanner = img;
  }

  @prop({ default: '' })
  uploadedPortrait: string;

  @Field(() => String)
  @prop() // this will create a virtual property
  get portraitImageUrl() : string {
    return this.uploadedPortrait || 'default';
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
