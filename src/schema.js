const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    "Query to get tracks array for the homepage grid"
    tracksForHome: [Track!]!
    track(id: ID!): Track
    user(id: ID!): User
    post(id: ID!): Post
    postArea(id: Int): Area
  }
  
  type Mutation {
    incrementTrackViews(id: ID!):  IncrementTrackViewsResponse!
  }
  
  type IncrementTrackViewsResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Newly updated track after a successful mutation"
    track: Track
  }

  "A track is a group of Modules that teaches about a specific topic"
  type Track {
    id: ID!
    "The track's title"
    title: String!
    "The track's main Author"
    author: Author!
    "The track's illustration to display in track card or track page detail"
    thumbnail: String
    "The track's approximate length to complete, in minutes"
    length: Int
    "The number of modules this track contains"
    modulesCount: Int
    "The track's complete description, can be in Markdown format"
    description: String
    "The number of times a track has been viewed"
    numberOfViews: Int
    modules: [Module!]!
  }

  type Module {
    id: ID!
    title: String!
    length: Int
  }
  
  "Author of a complete Track or a Module"
  type Author {
    id: ID!
    "Author's first and last name"
    name: String!
    "Author's profile picture"
    photo: String
  }
  
  "Uniplus User"
  type User {
    "User' id"
    id: ID!
    "School id of student"
    schoolId: String
    "Nickname"
    nickname: String
    "11 digit phone"
    phone: String
    "User create time"
    createTime: String
    "Gender, 男 or 女"
    gender: String
    "Avatar link from OSS"
    avatarLink: String
    "Role id"
    role: Int
    "User's real name"
    realName: String
  }
  
  "Uniplus Post Entity"
  type Post {
    "Identifier"
    id: ID!
    "Author's id"
    author: User!
    "Post send time"
    postTime: String
    "Post content"
    content: String
    "Post time"
    title: String
    "Post area"
    areaId: Int
    "Post likes count"
    likeCount: Int
    "Post Reply count"
    replyCount: Int
    "Post Replies"
    replies: [Reply]
  }
  
  "Post Replies"
  type Reply {
    "reply id"
    id: ID!
    "reply time"
    time: String
    "reply content"
    content: String
    "reply likes"
    likeCount: Int
    "reply author"
    author: User!
    "The reply id this reply is replying to"
    parentId: ID!
  }
  
  "Post area"
  type Area {
    "Area id, an integer"
    id: Int!
    "List of posts"
    posts: [Post]!
  }
`;

module.exports = typeDefs;
