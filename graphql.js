const { ApolloServer, gql } = require('apollo-server-lambda');
const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');

console.log('typeDefs', typeDefs);
console.log('resolvers', resolvers);

const server = new ApolloServer({ typeDefs, resolvers });

exports.graphqlHandler = (event, lambdaContext, callback) => {
  if (event.httpMethod === 'GET') {
    server.createHandler()(
      { ...event, path: event.requestContext.path || event.path },
      lambdaContext,
      callback,
    );
  } else {
    server.createHandler()(event, lambdaContext, callback);
  }
}
