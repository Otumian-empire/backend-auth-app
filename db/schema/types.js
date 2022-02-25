const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require("graphql");

const ResponseType = new GraphQLObjectType({
  name: "Response",
  description: "This represents the response after a query and mutation",
  fields: () => ({
    success: { type: GraphQLBoolean },
    message: { type: GraphQLString },
  }),
});

module.exports = { ResponseType };
