import { SessionModel } from '../../../../data/models/session';
import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { MyContext } from '../../../middleware/MyContext';
import { ONLY_OWN_USER } from '../../../middleware/authChecker';
import { ProviderModel } from '../../../../data/models/provider';
import { Session } from '../../../../data/models/session';
import { User, UserModel } from '../../../../data/models/user';
import { LogicError } from '../../../../common/errors/index';
import moment = require('moment');

@Resolver(User)
export class ListSessionsByUserResolvers {

  // @Authorized(ONLY_OWN_USER)
  @Query(returns => [Session])
  async listMyAvailableSessions(@Arg('providerId') providerId: string, @Arg('day') day: string, @Ctx() ctx: MyContext) {
    const user = ctx.user || await UserModel.findById(ctx.userId);
    if (!user) throw new LogicError('user is required')

    const provider = ctx.provider || await ProviderModel.findById(providerId, 'customers').populate('customers')
    if (!provider) throw new LogicError('provider is required')
  
    const startDay = moment(day, "YYYY-MM-DD").toDate();
    const endDay = moment(day, "YYYY-MM-DD").endOf('day').toDate();
    let sessions = await SessionModel.find({provider, startTime : { $gte: startDay, $lte: endDay}}).populate('coaches').populate('type').populate('attendances')
    return sessions;
  }
}


// function sessionAvailable (session : Session, user: User) {
//   if (session.availabilityStatus !== ACTIVE) return { available: false, message: session.status, paymentOptions: null};
//   if ()

// }