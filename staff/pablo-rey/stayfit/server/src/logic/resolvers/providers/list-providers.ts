import { AuthorizationError } from './../../../common/errors/index';
import { RequestCustomer, RequestCustomerModel } from './../../../data/models/request';
import { Authorized, Ctx, Query, Resolver, ObjectType, Field } from 'type-graphql';
import { MyContext } from '../../middleware/MyContext';
import { ONLY_SUPERADMIN } from '../../middleware/authChecker';
import { ProviderModel } from '../../../data/models/provider';
import { User, UserModel } from '../../../data/models/user';
import { Provider } from '../../../data/models/provider';

@ObjectType()
class ProviderAndRequest {
  @Field()
  provider: Provider;

  @Field()
  adminOf: boolean;
  
  @Field()
  coachOf: boolean;

  @Field()
  customerOf: boolean;

  @Field(() => RequestCustomer, { nullable: true })
  request: RequestCustomer | null;

}

@Resolver(User)
export class myProvidersInfo {
  @Authorized(ONLY_SUPERADMIN)
  @Query(returns => [Provider])
  async listProviders(@Ctx() ctx: MyContext) {
    return await ProviderModel.find()
      .populate('admins')
      .populate('customers')
      .populate('coaches');
  }

  @Authorized()
  @Query(returns => [ProviderAndRequest])
  async listMyProvidersInfo(@Ctx() ctx: MyContext) {
    const user = ctx.user || (await UserModel.findById(ctx.userId));
    const result: ProviderAndRequest[] = [];
    const providers = await ProviderModel.find();
    for (let provider of providers) {
      const request = await RequestCustomerModel.findOne({ user, provider });
      const adminOf = user!.adminOf.includes(provider.id)
      const coachOf = user!.coachOf.includes(provider.id)
      const customerOf = user!.customerOf.includes(provider.id)
      result.push({ provider, request, adminOf, coachOf, customerOf });
    }
    return result;
  }

  @Query(returns => [Provider])
  async listProvidersPublicInfo(@Ctx() ctx: MyContext) {
    const providers = await ProviderModel.find();
    const result = providers.map(({ id, name, bannerImageUrl, portraitImageUrl, registrationUrl }) => ({
      id,
      name,
      bannerImageUrl,
      portraitImageUrl,
      registrationUrl,      
    }));
    return result;
  }
}
