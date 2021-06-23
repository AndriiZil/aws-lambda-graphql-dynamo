const { ApolloServer, gql } = require('apollo-server-lambda');
const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');

const server = new ApolloServer({ typeDefs, resolvers });

exports.graphqlHandler = (event, lambdaContext, callback) => {
  if (event.httpMethod === 'GET') {
    server.createHandler({
      cors: {
        origin: '*',
        credentials: true,
      },
    })(
      { ...event, path: event.requestContext.path || event.path },
      lambdaContext,
      callback,
    );
  } else {
    server.createHandler()(event, lambdaContext, callback);
  }
}
