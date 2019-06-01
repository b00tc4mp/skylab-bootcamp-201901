import { SessionModel } from './../../../../models/session';
import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { MyContext } from '../../../../common/types/MyContext';
import { ONLY_OWN_USER } from '../../../../graphql/middleware/authChecker';
import { ProviderModel } from '../../../../models/provider';
import { Session } from '../../../../models/session';
import { User, UserModel } from '../../../../models/user';
import { LogicError } from './../../../../common/errors/index';
import moment = require('moment');

@Resolver(User)
export class ListSessionsByUserResolvers {

  @Authorized(ONLY_OWN_USER)
  @Query(returns => [Session])
  async listMyAvailableSessions(@Arg('providerId') providerId: string, @Ctx() ctx: MyContext) {
    const user = ctx.user || await UserModel.findById(ctx.userId);
    if (!user) throw new LogicError('user is required')

    const provider = ctx.provider || await ProviderModel.findById(providerId, 'customers').populate('customers')
    if (!provider) throw new LogicError('provider is required')
  
    const sessions = await SessionModel.find({provider}).populate('coaches').populate('type').populate('attendances')
    return sessions;
  }
}


// function sessionAvailable (session : Session, user: User) {
//   if (session.availabilityStatus !== ACTIVE) return { available: false, message: session.status, paymentOptions: null};
//   if ()

// }