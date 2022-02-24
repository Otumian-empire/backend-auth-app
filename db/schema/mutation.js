const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require("graphql");

const { ProfileType, ResponseType } = require("./types");
const {
  createProfile,
  updateProfile,
  updateProfilePassword,
} = require("./resolver");

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    create: {
      type: ProfileType,
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
    update: {
      type: ResponseType,
      description: "A update a single user by id",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        bio: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: updateProfile,
    },
    updatePassword: {
      type: ResponseType,
      description: "A update a single user's password by id",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: updateProfilePassword,
    },
  }),
});

module.exports = RootMutationType;
