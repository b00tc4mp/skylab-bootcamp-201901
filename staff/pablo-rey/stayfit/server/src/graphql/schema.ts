import { buildSchema } from 'type-graphql';
import { LoginResolver } from './../resolvers/auth/login-resolver';
import { SessionTypeResolver } from './../resolvers/session-type/session-type-resolver';

export async function createSchema() {
  return await buildSchema({
    resolvers: [SessionTypeResolver, LoginResolver],
  });
}
