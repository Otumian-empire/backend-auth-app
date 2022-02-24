const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const logger = require("./logger");
const sessionLifeTime = 1000 * 60 * 60 * 24 * 7;

const sessionConfig = ({ uri, secret }) => {
  return session({
    secret,
    cookies: {
      maxAge: sessionLifeTime,
      path: "/",
      httpOnly: false,
      secure: false,
    },
    store: new MongoDBStore(
      {
        uri,
        expires: sessionLifeTime,
      },
      (error) => {
        if (error) {
          logger.error(error.message);
        }
      }
    ),
    name: "connect.sid",
    unset: "destroy",
    resave: false,
    saveUninitialized: false,
  });
};

module.exports = sessionConfig;
