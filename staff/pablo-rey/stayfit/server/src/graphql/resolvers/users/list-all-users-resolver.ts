import { Ctx, Query, Resolver } from 'type-graphql';
import { MyContext } from '../../../common/types/MyContext';
import { User, UserModel } from '../../../models/user';
import { checkAuth } from '../../authorization';

export const AUTH_USER_LISTALL = 'AUTH_USER_LISTALL';

@Resolver(User)
export class ListAllUsersResolver {
  @Query(returns => [User])
  async listAllUsers(@Ctx() ctx: MyContext) {
    // Authorization
    const ownerId = ctx.userId;
    await checkAuth(AUTH_USER_LISTALL, { owner : ownerId });

    return await UserModel.find();
  }
}
