const { GraphQLObjectType, GraphQLString } = require("graphql");

const { ProfileType } = require("./types");
const { findUserById } = require("./resolver");

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    user: {
      type: ProfileType,
      description: "A single user",
      args: { id: { type: GraphQLString } },
      resolve: findUserById,
    },
  }),
});

module.exports = RootQueryType;
