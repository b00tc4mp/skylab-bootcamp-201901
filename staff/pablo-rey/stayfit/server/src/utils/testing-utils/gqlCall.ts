import { DocumentNode, graphql, GraphQLSchema } from 'graphql';
import { print } from 'graphql/language/printer';
import Maybe from 'graphql/tsutils/Maybe';
import { createSchema } from '../../graphql/schemas/rootSchema';
import { User } from './../../models/User';
import sinon = require('sinon');
import { MyContext } from './../../common/types/MyContext';

interface Options {
  source: string | DocumentNode;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
  ctx?: any | undefined;
}

let schema: GraphQLSchema;

export const gCall = async ({ source, variableValues, ctx }: Options) => {
  if (!schema) {
    schema = await createSchema();
  }
  const _source = typeof source === 'string' ? source : print(source);
  return graphql({
    schema,
    source: _source,
    variableValues,
    contextValue: ctx,
  });
};

// For documentation
// ctx: {
//   res: { cookie: fakeCookie },
//   userId: contextUserId,
//   user: contextUser,
// },
