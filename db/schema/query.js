const { GraphQLObjectType, GraphQLString } = require("graphql");

const { ResponseType } = require("./types");
const { loginUser } = require("./resolver");

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    login: {
      type: ResponseType,
      description: "A single user",
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: loginUser,
    },
  }),
});

module.exports = RootQueryType;
