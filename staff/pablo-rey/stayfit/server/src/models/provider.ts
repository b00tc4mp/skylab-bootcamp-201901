import { Types } from 'mongoose';
import { prop, arrayProp, Typegoose, Ref, instanceMethod } from 'typegoose';
import { ObjectType, Field, ID, Root } from 'type-graphql';
import { User, UserType } from './user';

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
