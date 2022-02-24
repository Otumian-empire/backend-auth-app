const { GraphQLSchema } = require("graphql");
const RootMutationType = require("./mutation");
const RootQueryType = require("./query");

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

module.exports = schema;
