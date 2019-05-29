import { graphql, GraphQLSchema, DocumentNode } from 'graphql';
import Maybe from 'graphql/tsutils/Maybe';

import { createSchema } from './../../graphql/schema';
import { User } from './../../models/User';

import { print } from 'graphql/language/printer';

interface Options {
  source: string | DocumentNode;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
  userId?: string;
  user?: User;
}

let schema: GraphQLSchema;

export const gCall = async ({ source, variableValues, user, userId }: Options) => {
  if (!schema) {
    schema = await createSchema();
  }
  const _source = typeof source === 'string' ? source : print(source);
  return graphql({
    schema,
    source: _source,
    variableValues,
    contextValue: {
      req: {
        userId,
        user,
      },
      res: {
        clearCookie: () => {}, //jest.fn()
      },
    },
  });
};
