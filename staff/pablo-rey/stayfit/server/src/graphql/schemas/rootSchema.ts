import { buildSchema } from 'type-graphql';
import { LoginResolver } from '../resolvers/auth/login-resolver';
import { InvalidateCredentialsResolver } from '../resolvers/auth/invalidate-credentials-resolver';
import { CreateSessionTypeResolver } from '../resolvers/session-type/create-session-type-resolver';
import { CreateUserResolver } from './../resolvers/users/create-user-resolver';
import { ListUsersResolvers } from '../resolvers/users/list-users-resolvers';
import { CreateProviderResolver } from '../resolvers/providers/create-provider-resolver';
import { UpdateProviderAdminsResolver } from '../resolvers/providers/update-admins-resolver';
import { authChecker } from '../middleware/authChecker';
import { UpdateProviderCoachesResolver } from '../resolvers/providers/update-coaches-resolver';
import { AddProviderCustomerResolver } from './../resolvers/providers/add-customer-resolver';
import { RemoveProviderCustomerResolver } from '../resolvers/providers/remove-customer-resolver';

export async function createSchema() {
  return await buildSchema({
    resolvers: [
      CreateSessionTypeResolver,
      LoginResolver,
      InvalidateCredentialsResolver,
      CreateUserResolver,
      ListUsersResolvers,
      CreateProviderResolver,
      UpdateProviderAdminsResolver,
      UpdateProviderCoachesResolver,
      AddProviderCustomerResolver,
      RemoveProviderCustomerResolver
    ],
    authChecker: authChecker,
  });
}
