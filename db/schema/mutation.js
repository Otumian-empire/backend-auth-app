const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require("graphql");

const { ResponseType } = require("./types");
const {
  createProfile,
  updateProfile,
  updateProfilePassword,
} = require("./resolver");

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    signup: {
      type: ResponseType,
      description: "A create a single user",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        bio: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: createProfile,
    },
    updateProfile: {
      type: ResponseType,
      description: "A update a single user",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        bio: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: updateProfile,
    },
    updatePassword: {
      type: ResponseType,
      description: "A update a single user's password",
      args: {
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: updateProfilePassword,
    },
  }),
});

module.exports = RootMutationType;
