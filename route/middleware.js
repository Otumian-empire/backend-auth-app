// keep authorized session (user) from visiting the login and signup routes
const isSessionAuthorized = (req, res, next) => {
  if (req.session.user && req.session.user.email && req.session.user.id) {
    return res.redirect("/");
  }

  return next();
};

// allows only authorized session to access said route
const protectRoute = (req, res, next) => {
  if (req.session.user && req.session.user.email && req.session.user.id) {
    return next();
  }

  return res.redirect("/logout");
};

module.exports = { isSessionAuthorized, protectRoute };
