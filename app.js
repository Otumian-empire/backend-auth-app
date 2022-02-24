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

// application modules
const logger = require("./configs/logger");
const httpLogger = require("./configs/http.logger");
const sessionConfiguration = require("./configs/session.config");
const webRoutes = require("./route");
const schema = require("./db/schema");

// application config constants
const { PORT, SESSION_SECRET, URI } = require("./configs/app.config");

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

// routes
app.use("/", webRoutes);
app.use(
  "/graphql",
  graphqlHTTP({ graphiql: process.env.NODE_ENV !== "production", schema })
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
  .catch((error) => logger.error(error.message));
