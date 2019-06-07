import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { LogicError } from '../../../../common/errors/index';
import { ProviderModel } from '../../../../data/models/provider';
import { Session, SessionModel } from '../../../../data/models/session';
import { ONLY_ADMINS_OF_PROVIDER } from '../../../middleware/authChecker';
import { MyContext } from '../../../middleware/MyContext';
import moment = require('moment');

@Resolver(Session)
export class ListSessionsAdminsResolvers {
  @Authorized(ONLY_ADMINS_OF_PROVIDER)
  @Query(returns => [Session])
  async listSessions(@Arg('providerId') providerId: string, @Arg('day') day: string, @Ctx() ctx: MyContext) {
    const provider = ctx.provider || (await ProviderModel.findById(providerId, 'customers').populate('customers'));
    if (!provider) throw new LogicError('provider is required');

    const startDay = moment(day, 'YYYY-MM-DD').toDate();
    const endDay = moment(day, 'YYYY-MM-DD')
      .endOf('day')
      .toDate();
    const sessions = await SessionModel.find({ provider, startTime: { $gte: startDay, $lte: endDay } })
      .populate('coaches')
      .populate('type')
      .populate({
        path: 'attendances',
        populate: { path: 'user' },
      });
    return sessions;
  }
}
