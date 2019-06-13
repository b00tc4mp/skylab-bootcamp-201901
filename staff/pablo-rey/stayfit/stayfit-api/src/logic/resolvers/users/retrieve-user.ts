import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { ValidationError } from '../../../common/errors/index';
import { User, UserModel } from '../../../data/models/user';
import { ALWAYS_OWN_USER } from '../../middleware/authChecker';
import { MyContext } from '../../middleware/MyContext';

@Resolver(User)
export class RetrieveUserResolver {
  /**
   * Retrieve all data of a user
   * 
   * @param userId 
   * @param ctx 
   */
  @Authorized([ALWAYS_OWN_USER])
  @Query(returns => User)
  async retrieveUser(@Arg('userId') userId: string, @Ctx() ctx: MyContext) {
    if (!userId) throw new ValidationError('user is required')
    return await UserModel.findById(userId);
  }

}
