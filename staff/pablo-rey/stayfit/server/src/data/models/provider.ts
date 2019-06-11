import { Field, ID, ObjectType, Authorized } from 'type-graphql';
import { arrayProp, instanceMethod, prop, Ref, Typegoose } from 'typegoose';
import { User } from './user';
import { SessionType } from './session-type';

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

  @Field(returns => [SessionType])
  @arrayProp({ itemsRef: SessionType, default: []})
  sessionTypes: SessionType[];

  @Field()
  @prop({ required: true, default: 'fitness'})
  icon : string;

  @prop({ default: '' })
  uploadedBanner: string;

  @Field(() => String)
  @prop()
  get bannerImageUrl() {
    return (this as any)._doc.uploadedBanner || 'default';
  }

  @prop({ default: '' })
  uploadedPortrait: string;

  @Field(() => String)
  @prop()
  get portraitImageUrl() {
    return (this as any)._doc.uploadedPortrait || 'default';
  }

  @Field()
  @prop({default : ''})
  registrationUrl: string
}

export const ProviderModel = new Provider().getModelForClass(Provider, {
  schemaOptions: { collection: 'providers' },
});
