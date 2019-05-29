import { Field, ID, ObjectType } from 'type-graphql';
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
  @arrayProp({ itemsRef: User })
  admins: Ref<User>[];

  @Field(returns => [User], { nullable: 'items' })
  @arrayProp({ itemsRef: User })
  coaches: Ref<User>[];

  @Field(returns => [User], { nullable: 'items' })
  @arrayProp({ itemsRef: User })
  customers: Ref<User>[];

  @instanceMethod
  isAdmin(this: Provider, user: User | string) {
    const userId = typeof user === 'string' ? user : (user as any)._id.toString();
    const result = this.admins.some(admin => {
      return (admin as any).toString() === userId;
    });
    return result;
  }

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
