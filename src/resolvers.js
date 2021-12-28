const resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate the homepage grid of our web client
    tracksForHome: (_, __, { dataSources }) => {
      return dataSources.trackAPI.getTracksForHome();
    },
    track: (_, { id }, { dataSources }) => {
      return dataSources.trackAPI.getTrack(id);
    },
    user: async (_, { id }, { dataSources }) => {
      let temp = await dataSources.userAPI.getUser(id)
      console.log(temp)
      let user = {
        id: temp.userId,
        schoolId: temp.userSchoolId,
        nickname: temp.userNickName,
        phone: temp.userPhone,
        createTime: temp.userCreateTime,
        gender: temp.userGender ?  "女" : "男",
        avatarLink: temp.userAvatarLink,
        role: temp.userRole,
        realName: temp.userRealName,
      }
      return user
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
};

module.exports = resolvers;
