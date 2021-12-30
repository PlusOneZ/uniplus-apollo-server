const resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate the homepage grid of our web client
    tracksForHome: (_, __, { dataSources }) => {
      return dataSources.trackAPI.getTracksForHome();
    },
    track: (_, { id }, { dataSources }) => {
      return dataSources.trackAPI.getTrack(id);
    },
    user: (_, { id }, { dataSources }) => {
      return dataSources.userAPI.getUser(id)
    },
    post: (_, { id }, { dataSources }) => {
      console.log("post")
      return  dataSources.postAPI.getPost(id)
    },
    postArea: (_, { id }, { dataSources }) => {
      return dataSources.postAPI.getArea(id)
    }
  },

  Mutation: {
    incrementTrackViews: async (_, { id }, { dataSources }) => {
      try {
        const track = await dataSources.trackAPI.incrementTrackViews(id)

        return {
          code: 200,
          success: true,
          message: `Successfully incremented number of views for track ${id}`,
          track,
        }
      } catch (err) {
        return {
          code: err.extentions.response.status,
          success: false,
          message: err.extentions.response.body,
          track: null
        }
      }
    }
  },

  Track: {
    author: ({ authorId }, _, { dataSources }) => {
      return dataSources.trackAPI.getAuthor(authorId);
    },
    modules: ({ id }, _, { dataSources }) => {
      return dataSources.trackAPI.getTrackModules(id)
    }
  },

  Post: {
    author: ({ authorId }, _, { dataSources }) => {
      console.log("post author: ", authorId)
      return dataSources.userAPI.getUser(authorId)
    },
    replies: ({ id }, _, { dataSources }) => {
      return dataSources.postAPI.getReplyOfPost(id)
    }
  }
};

module.exports = resolvers;
