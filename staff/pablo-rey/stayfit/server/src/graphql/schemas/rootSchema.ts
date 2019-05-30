import { buildSchema } from 'type-graphql';
import { LoginResolver } from '../resolvers/auth/login-resolver';
import { InvalidateCredentialsResolver } from '../resolvers/auth/invalidate-credentials-resolver';
import { SessionTypeResolver } from '../resolvers/session-type/session-type-resolver';
import { CreateUserResolver } from './../resolvers/users/create-user-resolver';
import { ListAllUsersResolver } from '../resolvers/users/list-all-users-resolver';
import { CreateProviderResolver } from '../resolvers/providers/create-provider-resolver';
import { UpdateProviderAdminsResolver } from '../resolvers/providers/update-admins-resolver';

export async function createSchema() {
  return await buildSchema({
    resolvers: [SessionTypeResolver, LoginResolver, InvalidateCredentialsResolver, 
      CreateUserResolver, ListAllUsersResolver, CreateProviderResolver, UpdateProviderAdminsResolver
    ],
  });
}
