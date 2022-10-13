const typeDefs = /* GraphQL */ `
  type Video {
    id: Int!
    title: String!
    description: String
    thumbnail: String
    file: String
  }

  type User {
    id: ID!
    name: String!
    status: String!
  }

  type Query {
    viewer: User!
    videos: [Video!]!
  }

  type Mutation {
    updateName(name: String!): User!
    addVideo(
      title: String!
      description: String
      thumbnail: String
      file: String
    ): Video!
  }
`;

export default typeDefs;
