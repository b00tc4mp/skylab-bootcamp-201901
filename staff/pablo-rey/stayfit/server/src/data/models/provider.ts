import { Field, ID, ObjectType, Authorized } from 'type-graphql';
import { arrayProp, instanceMethod, prop, Ref, Typegoose } from 'typegoose';
import { User } from './user';
import { ONLY_ADMINS_OF_PROVIDER, ONLY_SUPERADMIN } from '../../logic/middleware/authChecker';

@ObjectType()
export class Provider extends Typegoose {
  @Field(() => ID)
  id: number;

  @Field()
  @prop({ required: true, trim: true })
  name: string;

  @Field(returns => [User], { nullable: 'items' })
  @arrayProp({ itemsRef: { name: 'User' } })
  admins: Ref<User>[];

  @Field(returns => [User], { nullable: 'items' })
  @arrayProp({ itemsRef: { name: 'User' } })
  coaches: Ref<User>[];

  @Field(returns => [User], { nullable: 'items' })
  @arrayProp({ itemsRef: { name: 'User' } })
  customers: Ref<User>[];

  @prop({ default: '' })
  uploadedBanner: string;

  @Field(() => String)
  @prop() // this will create a virtual property called 'fullName'
  get bannerImageUrl() {
    return this.uploadedBanner || 'default';
  }
  set bannerImageUrl(img) {
    this.uploadedBanner = img;
  }

  @prop({ default: '' })
  uploadedPortrait: string;

  @Field(() => String)
  @prop() // this will create a virtual property called 'fullName'
  get portraitImageUrl() {
    return this.uploadedPortrait || 'default';
  }
  set portraitImageUrl(img) {
    this.uploadedPortrait = img;
  }
  @instanceMethod
  isAdmin(this: Provider, user: User | string) {
    const userId = typeof user === 'string' ? user : (user as any)._id.toString();
    const result = this.admins.some(admin => {
      return (admin as any).toString() === userId;
    });
    return result;
  }

  @Authorized(ONLY_ADMINS_OF_PROVIDER)
  @instanceMethod
  isCustomer(this: Provider, user: User | string) {
    const userId = typeof user === 'string' ? user : (user as any)._id.toString();
    const result = this.customers.some(customer => {
      return (customer as any).toString() === userId;
    });
    return result;
  }
}

export const ProviderModel = new Provider().getModelForClass(Provider, {
  schemaOptions: { collection: 'providers' },
});
