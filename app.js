if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// system modules
const path = require("path");

// third party modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
} = require("graphql");

// application modules
const logger = require("./configs/logger");
const httpLogger = require("./configs/http.logger");
const sessionConfiguration = require("./configs/session.config");
const webRoutes = require("./route");
const Profile = require("./db/models/");

// application config constants
const { PORT, ROUNDS, SESSION_SECRET, URI } = require("./configs/app.config");

// express application
const app = express();

// session store configuration
app.use(sessionConfiguration({ secret: SESSION_SECRET, uri: URI }));

// static file path
app.use(express.static(path.join(__dirname, "static")));

// view setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(httpLogger);

// MOVE THESE INTO THEIR OWN FILE
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

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    user: {
      type: ProfileType,
      description: "A single user",
      args: { id: { type: GraphQLString } },
      resolve: (parent, args) => {
        return Profile.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(ProfileType),
      description: "A list of users",
      resolve: () => Profile.find(),
    },
  }),
});

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
      resolve: async (parent, args) => {
        try {
          const { name, bio, phone, email, password } = args;

          const hash = await bcrypt.hash(password, ROUNDS);

          const newUser = await Profile.create({
            name,
            bio,
            phone,
            email,
            password: hash,
          });

          if (!newUser) {
            return {
              success: false,
              message: "Signup unsuccessful",
            };
          }

          return newUser;
        } catch (error) {
          logger.error(error);
          return {
            success: false,
            message: "An error occurred",
          };
        }
      },
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
      resolve: async (parent, args) => {
        const response = { success: true, message: "update successful" };

        try {
          const { id, name, bio, phone, email } = args;

          const updatedUser = await Profile.updateOne(
            { id },
            { name, bio, phone, email }
          );

          if (!updatedUser) {
            response.success = false;
            response.message = "Update unsuccessful";
          }
        } catch (error) {
          logger.error(error);
          response.success = false;
          response.message = "An error occurred";
        } finally {
          return response;
        }
      },
    },
    updatePassword: {
      type: ResponseType,
      description: "A update a single user's password by id",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const response = { success: true, message: "Update successful" };

        try {
          const { id, password } = args;
          const hash = await bcrypt.hash(password, ROUNDS);
          const updatedUser = await Profile.updateOne(
            { id },
            { password: hash }
          );

          if (!updatedUser) {
            response.success = false;
            response.message = "Update unsuccessful";
          }
        } catch (error) {
          logger.error(error);
          response.success = false;
          response.message = "An error occurred";
        } finally {
          return response;
        }
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

// routes
app.use("/", webRoutes);
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
  })
);

// only serve when the database is connected
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`[${new Date()}] :: mongodb connected`);
      logger.info(`[${new Date()}] :: listening on port, ${PORT}`);
    });
  })
  .catch((err) => logger.error(err));
