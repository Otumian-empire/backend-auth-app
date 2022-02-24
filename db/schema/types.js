const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require("graphql");

const ProfileType = new GraphQLObjectType({
  name: "Profile",
  description: "This represents the user data",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    bio: { type: GraphQLString },
    phone: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

const ResponseType = new GraphQLObjectType({
  name: "Response",
  description: "This represents the response from a mutation",
  fields: () => ({
    success: { type: GraphQLBoolean },
    message: { type: GraphQLString },
  }),
});

module.exports = { ProfileType, ResponseType };
