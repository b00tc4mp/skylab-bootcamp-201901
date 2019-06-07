import { Field, ID, ObjectType } from 'type-graphql';
import { prop, Ref, Typegoose, staticMethod } from 'typegoose';
import { Session } from './session';
import { User } from './user';
import { Provider } from './provider';

import {
  REQUESTBECUSTOMER,
  REQUESTBEPROVIDER,
  REQUESTTYPES,
  CANCEL,
  ACCEPT,
  DENIEDBYUSER,
  DENIEDBYPROVIDER,
  PENDING,
  BLOCKEDBYUSER,
  BLOCKEDBYPROVIDER,
  REQUESTSTATUS,
} from '../enums';

@ObjectType()
export class RequestCustomer extends Typegoose {
  @Field(() => ID)
  id: number;

  @Field(returns => User)
  @prop({ ref: User, required: true })
  user: Ref<User>;

  @Field(returns => Session)
  @prop({ ref: { name: 'Session' }, required: true })
  provider: Ref<Provider>;

  @Field()
  @prop({ enum: REQUESTTYPES })
  type: string;

  @Field()
  @prop({ enum: REQUESTSTATUS })
  status: string;

  @Field(returns => Date, { nullable: true })
  @prop({ required: false, default: null })
  resolutionDate: Date | null;
}

export const RequestCustomerModel = new RequestCustomer().getModelForClass(RequestCustomer, {
  schemaOptions: { collection: 'requests-customer' },
});
