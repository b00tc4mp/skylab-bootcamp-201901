import { buildSchema } from 'type-graphql';
// import { ProviderResolver } from './graphql/provider-resolvers';
// import { SessionResolver } from './graphql/session-resolvers';
// import { UserResolver } from './graphql/user-resolvers';
import { LoginResolver } from './../resolvers/auth/login-resolver';
import { SessionTypeResolver } from './../resolvers/session-type/';

export async function createSchema() {
  return await buildSchema({
    resolvers: [SessionTypeResolver, LoginResolver],
  });
}
