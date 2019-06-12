import { Authorized, Field, ID, ObjectType, Root } from 'type-graphql';
import { arrayProp, prop, Ref, Typegoose } from 'typegoose';
import { ONLY_OWN_USER, ONLY_SUPERADMIN } from '../../logic/middleware/authChecker';
// Constants
import { GUEST_ROLE, ROLES } from '../enums';
import { Provider } from './provider';


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
    trim: true,
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

  @prop({ default: '' })
  uploadedBanner: string;

  @Field(() => String)
  @prop() // this will create a virtual property called 'fullName'
  get bannerImageUrl(): string {
    return (this as any).uploadedBanner || 'default';
  }
  set bannerImageUrl(img) {
    (this as any).uploadedBanner = img;
  }

  @prop({ default: '' })
  uploadedPortrait: string;

  @Field(() => String)
  @prop() // this will create a virtual property
  get portraitImageUrl(): string {
    return (this as any)._doc.uploadedPortrait || '/user-no-picture.png';
  }
  set portraitImageUrl(img) {
    (this as any).uploadedPortrait = img;
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
