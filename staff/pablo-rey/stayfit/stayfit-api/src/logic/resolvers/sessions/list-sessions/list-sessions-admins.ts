import { AuthorizationError } from './../../../../common/errors/index';
import { Arg, Authorized, Ctx, Query, Resolver, Args } from 'type-graphql';
import { LogicError } from '../../../../common/errors/index';
import { ProviderModel, Provider } from '../../../../data/models/provider';
import { Session, SessionModel } from '../../../../data/models/session';
import { ONLY_ADMINS_OF_PROVIDER } from '../../../middleware/authChecker';
import { MyContext } from '../../../middleware/MyContext';
import * as moment from 'moment';

@Resolver(Session)
export class ListSessionsAdminsResolvers {

  /**
   * 
   * List all sessions of a day for this provider
   * 
   * @param providerId 
   * @param day 
   * @param ctx 
   */
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
      .populate('provider')
      .populate('coaches')
      .populate('type')
      .populate({
        path: 'attendances',
        populate: { path: 'user' },
      });
    return sessions;
  }

  @Authorized(ONLY_ADMINS_OF_PROVIDER)
  @Query(returns => Session)
  async retrieveSession(@Arg('sessionId') sessionId: string, @Arg('providerId') providerId: string) {
    const session = await SessionModel.findById(sessionId)
      .populate('provider')
      .populate('coaches')
      .populate('type')
      .populate({
        path: 'attendances',
        populate: { path: 'user' },
      });
    if (!session) throw new LogicError('session not found');
    if (providerId !== (session.provider as Provider).id.toString())
      throw new AuthorizationError('provider does match in session');
    return session;
  }
}
