import { MeResolver } from './../../logic/resolvers/users/me';
import { buildSchema } from 'type-graphql';
import { LoginResolver } from '../../logic/resolvers/auth/login';
import { InvalidateCredentialsResolver } from '../../logic/resolvers/auth/invalidate-credentials';
import { CreateSessionTypeResolver } from '../../logic/resolvers/session-type/create-session-type';
import { CreateUserResolver } from '../../logic/resolvers/users/create-user';
import { ListUsersResolvers } from '../../logic/resolvers/users/list-users';
import { CreateProviderResolver } from '../../logic/resolvers/providers/create-provider';
import { UpdateProviderStaffResolver } from '../../logic/resolvers/providers/update-staff';
import { authChecker } from '../../logic/middleware/authChecker';
import { AddProviderCustomerResolver } from '../../logic/resolvers/providers/add-customer';
import { RemoveProviderCustomerResolver } from '../../logic/resolvers/providers/remove-customer';
import { RetrieveUserResolver } from '../../logic/resolvers/users/retrieve-user';
import { myProvidersInfo } from '../../logic/resolvers/providers/list-providers';
import { CreateSessionsResolver } from '../../logic/resolvers/sessions/create-session/create-session';
import { CreateSessionsInput } from '../../logic/resolvers/sessions/create-session/create-session';
import { ListSessionsByUserResolvers, SessionsWithMyAttendance } from '../../logic/resolvers/sessions/list-sessions/list-sessions-users';
import { AttendSessionResolvers, AttendanceInput } from '../../logic/resolvers/sessions/attend-session/attend-session';
import { ListAttendancesResolvers } from './../../logic/resolvers/attendances/list-attendances';
import { ListSessionsAdminsResolvers } from './../../logic/resolvers/sessions/list-sessions/list-sessions-admins'
import { ProviderResolver } from '../../logic/resolvers/providers/retrieve-provider';
export async function createSchema() {
  return await buildSchema({
    resolvers: [
      MeResolver,
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
      UpdateProviderStaffResolver,
      AddProviderCustomerResolver,
      RemoveProviderCustomerResolver,
      myProvidersInfo,
      ListAttendancesResolvers,
      SessionsWithMyAttendance,
      ListSessionsAdminsResolvers,
      ProviderResolver,
    ],
    authChecker: authChecker,
  });
}
