import { Types } from 'mongoose';
import { Field, ID, ObjectType } from 'type-graphql';
import { arrayProp, instanceMethod, prop, Ref, Typegoose } from 'typegoose';
import { User, UserType } from './user';

export type Provider__Type = {
  id?: string;
  _id?: Types.ObjectId;
  name: string;
  admins: UserType[];
  coaches: UserType[];
  customers: UserType[];
};

@ObjectType()
export class Provider extends Typegoose {
  @Field(() => ID)
  id: number;

  @Field()
  @prop({ required: true, trim: true })
  name: string;

  @Field(returns => [User], { nullable: 'items' })
  @arrayProp({ itemsRef: User })
  admins: Ref<User>[];

  @Field(returns => [User], { nullable: 'items' })
  @arrayProp({ itemsRef: User })
  coaches: Ref<User>[];

  @Field(returns => [User], { nullable: 'items' })
  @arrayProp({ itemsRef: User })
  customers: Ref<User>[];

  @instanceMethod
  isAdmin(this: Provider, user: UserType | string) {
    const userId = typeof user === 'string' ? user : (user as any)._id.toString();
    const result = this.admins.some(admin => {
      return (admin as any).toString() === userId;
    });
    return result;
  }

  @instanceMethod
  isCustomer(this: Provider, user: UserType | string) {
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
