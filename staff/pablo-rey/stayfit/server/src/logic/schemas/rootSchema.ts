import { buildSchema } from 'type-graphql';
import { LoginResolver } from '../../logic/resolvers/auth/login-resolver';
import { InvalidateCredentialsResolver } from '../../logic/resolvers/auth/invalidate-credentials-resolver';
import { CreateSessionTypeResolver } from '../../logic/resolvers/session-type/create-session-type-resolver';
import { CreateUserResolver } from '../../logic/resolvers/users/create-user-resolver';
import { ListUsersResolvers } from '../../logic/resolvers/users/list-users-resolvers';
import { CreateProviderResolver } from '../../logic/resolvers/providers/create-provider-resolver';
import { UpdateProviderAdminsResolver } from '../../logic/resolvers/providers/update-admins-resolver';
import { authChecker } from '../../logic/middleware/authChecker';
import { UpdateProviderCoachesResolver } from '../../logic/resolvers/providers/update-coaches-resolver';
import { AddProviderCustomerResolver } from '../../logic/resolvers/providers/add-customer-resolver';
import { RemoveProviderCustomerResolver } from '../../logic/resolvers/providers/remove-customer-resolver';
import { RetrieveUserResolver } from '../../logic/resolvers/users/retrieve-user-resolver';
import { ListProvidersResolver } from '../../logic/resolvers/providers/list-providers-resolver';
import { CreateSessionsResolver } from '../../logic/resolvers/sessions/create-session/create-session-resolver';
import { CreateSessionsInput } from '../../logic/resolvers/sessions/create-session/create-session-resolver';
import { ListSessionsByUserResolvers } from '../../logic/resolvers/sessions/list-sessions/list-sessions-by-user-resolvers';
import { AttendSessionResolvers, AttendanceInput } from '../../logic/resolvers/sessions/attend-session/attend-session-resolvers';

export async function createSchema() {
  return await buildSchema({
    resolvers: [
      CreateSessionTypeResolver,
      CreateSessionsResolver,
      CreateSessionsInput,
      ListSessionsByUserResolvers,
      AttendSessionResolvers,
      AttendanceInput,
      LoginResolver,
      InvalidateCredentialsResolver,
      CreateUserResolver,
      RetrieveUserResolver,
      ListUsersResolvers,
      CreateProviderResolver,
      UpdateProviderAdminsResolver,
      UpdateProviderCoachesResolver,
      AddProviderCustomerResolver,
      RemoveProviderCustomerResolver,
      ListProvidersResolver
    ],
    authChecker: authChecker,
  });
}
