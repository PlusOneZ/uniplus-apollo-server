const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const TrackAPI = require('./datasources/track-api');
const UserAPI = require('./datasources/user-api')
const PostAPI = require('./datasources/post-api')

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
      return {
        trackAPI: new TrackAPI(),
        userAPI: new UserAPI(),
        postAPI: new PostAPI()
      };
    },
  });

  const { url, port } = await server.listen({port: process.env.PORT || 4000});
  console.log(`
      🚀  Server is running
      🔉  Listening on port ${port}
      📭  Query at ${url}
    `);
}

startApolloServer(typeDefs, resolvers);
