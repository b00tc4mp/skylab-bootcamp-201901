import { RequestCustomerModel } from './../../../data/models/request';
import { Arg, Authorized, Ctx, Query, Resolver, Field, ObjectType } from 'type-graphql';
import { MyContext } from '../../middleware/MyContext';
import { ONLY_ADMINS_OF_PROVIDER, ONLY_SUPERADMIN } from '../../middleware/authChecker';
import { ProviderModel } from '../../../data/models/provider';
import { User, UserModel } from '../../../data/models/user';
import { LogicError } from '../../../common/errors';
import { RequestCustomer } from '../../../data/models/request';
import { request } from 'http';

@ObjectType()
export class UserAndRequest {
  @Field()
  customer: User;

  @Field()
  pending: boolean;

  @Field({ nullable: true })
  request: RequestCustomer;
}

@Resolver(User)
export class ListUsersResolvers {
  @Authorized(ONLY_SUPERADMIN)
  @Query(returns => [User])
  async listAllUsers(@Ctx() ctx: MyContext) {
    return await UserModel.find();
  }

  @Authorized(ONLY_ADMINS_OF_PROVIDER)
  @Query(returns => [UserAndRequest])
  async listCustomers(@Arg('providerId') providerId: string, @Ctx() ctx: MyContext) {
    const provider = await ProviderModel.findById(providerId, 'customers').populate('customers');
    if (!provider) throw new LogicError('provider is required');
    let customers = provider.customers as User[];
    const requests = await RequestCustomerModel.find({ provider }).populate('user');
    const requestsUsers = requests.map(request => request.user) as User[]
    customers.push(...requestsUsers);
    customers = customers.filter((v,i,a) => a.findIndex(x => x.id.toString() === v.id.toString()) === i)
    const result = (customers as User[]).map(customer => ({
      customer,
      pending: false,
      request: requests.find(req => (req.user as User).id.toString() === customer.id.toString()),
    }));
    return result;
  }
}
