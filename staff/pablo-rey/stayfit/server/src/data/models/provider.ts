import { Field, ID, ObjectType, Authorized } from 'type-graphql';
import { arrayProp, instanceMethod, prop, Ref, Typegoose } from 'typegoose';
import { User } from './user';

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

  @Field()
  @prop({ required: true, default: 'fitness'})
  icon : string;

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

  @Field()
  @prop({default : ''})
  registrationUrl: string
}

export const ProviderModel = new Provider().getModelForClass(Provider, {
  schemaOptions: { collection: 'providers' },
});
