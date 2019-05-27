import { importSchema } from 'graphql-import';
import graphqlResolver from './resolvers';

/**
 * There is a bug with graphql-import
 * https://github.com/prisma/graphql-import/issues/190
 * TODO Remove once this PR updated
*/
const graphqlSchema = `
  ${importSchema('./src/graphql/index.graphql')}
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;

export {
  graphqlSchema,
  graphqlResolver,
};
