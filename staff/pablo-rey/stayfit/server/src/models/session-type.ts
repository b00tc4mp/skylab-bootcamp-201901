import { Field, ID, ObjectType } from 'type-graphql';
import { prop, Ref, Typegoose } from 'typegoose';
import { Provider } from './provider';

@ObjectType()
export class SessionType extends Typegoose {
  @Field(() => ID)
  id: number;

  @Field()
  @prop({ index: true})
  type: string;

  @Field()
  @prop({ required: true })
  title: string;

  @Field()
  @prop({ required: true, default: true })
  active: string;
  
  @Field(returns => Provider)
  @prop({ ref: Provider, required: true })
  provider: Ref<Provider>;

}

export const SessionTypeModel = new SessionType().getModelForClass(SessionType, {
  schemaOptions: { collection: 'sessionTypes' },
});
