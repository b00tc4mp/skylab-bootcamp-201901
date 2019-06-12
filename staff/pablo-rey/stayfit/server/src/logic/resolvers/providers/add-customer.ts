import { ALWAYS_OWN_USER } from './../../middleware/authChecker';
import {
  ACCEPT,
  PENDING,
  REQUESTBEPROVIDER,
  BLOCKEDBYPROVIDER,
  BLOCKEDBYUSER,
  REQUESTBECUSTOMER,
  DENIEDBYPROVIDER,
  DENIEDBYUSER,
} from './../../../data/enums';
import { Arg, Authorized, Ctx, Mutation, Resolver, Query } from 'type-graphql';
import { ValidationError, LogicError } from '../../../common/errors';
import { MyContext } from '../../middleware/MyContext';
import { RequestCustomer, RequestCustomerModel } from './../../../data/models/request';
import { Provider, ProviderModel } from '../../../data/models/provider';
import { UserModel } from '../../../data/models/user';
import { ONLY_ADMINS_OF_PROVIDER, ALWAYS_OWN_CUSTOMER } from '../../middleware/authChecker';

@Resolver(Provider)
export class AddProviderCustomerResolver {
  @Authorized(ONLY_ADMINS_OF_PROVIDER)
  @Mutation(returns => Boolean)
  async addProviderCustomer(
    @Arg('providerId') providerId: string,
    @Arg('userId') userId: string,
    @Ctx() ctx: MyContext
  ) {
    const user = await UserModel.findById(userId);
    if (!user) throw new ValidationError('user is required');

    const provider = await ProviderModel.findById(providerId);
    if (!provider) throw new ValidationError('provider is required');

    const req = await RequestCustomerModel.findOne({ user, provider });
    if (!req) throw new LogicError('requestCustomer is required');
    if (req.status !== ACCEPT) throw new LogicError('requestCustomer is ' + req.status);

    if (!provider!.customers.includes(user.id)) {
      provider!.customers.push(user);
      await provider!.save();
    }
    if (!user.customerOf.includes(provider!.id)) {
      user.customerOf.push(provider!);
      await user.save();
    }

    return true;
  }

  @Authorized([ALWAYS_OWN_USER, ONLY_ADMINS_OF_PROVIDER])
  @Mutation(returns => Boolean)
  async updateRequestCustomer(
    @Arg('providerId') providerId: string,
    @Arg('userId') userId: string,
    @Arg('status') status: string,
    @Ctx() ctx: MyContext
  ) {
    const user = await UserModel.findById(userId);
    if (!user) throw new ValidationError('user is required');

    const provider = await ProviderModel.findById(providerId);
    if (!provider) throw new ValidationError('provider is required');

    const req = await RequestCustomerModel.findOne({ user, provider });
    const originCustomer = userId === ctx.userId;
    const originProvider = !originCustomer;
    const type = originProvider ? REQUESTBEPROVIDER : REQUESTBECUSTOMER;

    if (!req) {
      await RequestCustomerModel.create({ provider, user, type, status: PENDING });
      return true;
    }

    if (originProvider) {
      switch (req.status) {
        case ACCEPT:
          break;
        case BLOCKEDBYUSER:
        case DENIEDBYUSER:
          return false;
        case BLOCKEDBYPROVIDER:
        case DENIEDBYPROVIDER:
          req.status = status;
          break;
        case PENDING:
          if (req.type === REQUESTBEPROVIDER) {
            if (status === 'CANCEL') {
              await RequestCustomerModel.findByIdAndDelete(req.id);
              return true;
            } else return false;
          }
          req.status = status;
          break;
      }
    } else {
      switch (req.status) {
        case BLOCKEDBYPROVIDER:
        case DENIEDBYPROVIDER:
          return false;
          break;
        case ACCEPT:
        case BLOCKEDBYUSER:
        case DENIEDBYUSER:
          req.status = status;
          break;
        case PENDING:
          if (req.type === REQUESTBECUSTOMER) {
            if (status === 'CANCEL') {
              await RequestCustomerModel.findByIdAndDelete(req.id);
              return true;
            } else return false;
          }
          req.status = status;
          break;
      }
    }
    await req.save();
    return true;
  }

  @Authorized([ALWAYS_OWN_USER, ONLY_ADMINS_OF_PROVIDER])
  @Query(returns => RequestCustomer, { nullable: true })
  async retrieveRequestCustomer(
    @Arg('providerId') providerId: string,
    @Arg('userId') userId: string,
    @Ctx() ctx: MyContext
  ) {
    const user = await UserModel.findById(userId);
    if (!user) throw new ValidationError('user is required');

    const provider = await ProviderModel.findById(providerId);
    if (!provider) throw new ValidationError('provider is required');

    const req = await RequestCustomerModel.findOne({ user, provider });
    return req;
  }

  @Authorized(ONLY_ADMINS_OF_PROVIDER)
  @Query(returns => [RequestCustomer], { nullable: true })
  async retrievePendingRequest(@Arg('providerId') providerId: string, @Ctx() ctx: MyContext) {
    const provider = ctx.provider || (await ProviderModel.findById(providerId));
    if (!provider) throw new ValidationError('provider is required');

    const req = await RequestCustomerModel.find({ provider }).populate('user');
    return req;
  }
}
