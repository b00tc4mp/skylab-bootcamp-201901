import { ONLY_OWN_USER, ONLY_SUPERADMIN } from '../../logic/middleware/authChecker';
import { Field, ID, ObjectType, Root, Authorized } from 'type-graphql';
import { prop, Ref, Typegoose, arrayProp } from 'typegoose';
import { Provider } from './provider';

// Constants
import { SUPERADMIN_ROLE, BUSINESS_ROLE, ADMIN_ROLE, STAFF_ROLE, USER_ROLE, GUEST_ROLE, ROLES } from '../enums';

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

  @Field()
  @prop({ required: false, trim: true })
  phone: string;

  @prop({ required: true })
  password: string;

  @Authorized(ONLY_SUPERADMIN)
  @Field()
  @prop({ required: true, default: GUEST_ROLE, enum: ROLES })
  role: string;

  @Authorized(ONLY_OWN_USER)
  @Field(returns => [Provider], { nullable: 'items' })
  @arrayProp({ itemsRef: Provider })
  customerOf: Ref<Provider>[];

  @Authorized(ONLY_OWN_USER)
  @Field(returns => [Provider], { nullable: 'items' })
  @arrayProp({ itemsRef: Provider })
  coachOf: Ref<Provider>[];

  @Authorized(ONLY_OWN_USER)
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
  get bannerImageUrl(): string {
    return this.uploadedBanner || 'default';
  }
  set bannerImageUrl(img) {
    this.uploadedBanner = img;
  }

  @prop({ default: '' })
  uploadedPortrait: string;

  @Field(() => String)
  @prop() // this will create a virtual property
  get portraitImageUrl(): string {
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
