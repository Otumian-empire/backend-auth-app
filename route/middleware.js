// keep authorized session (user) from visiting the login and signup routes
const isSessionAuthorized = (req, res, next) => {
  const authUser = { ...req.session.user };

  if (authUser && authUser.email && authUser.id) {
    return res.redirect("/");
  }

  return next();
};

// allows only authorized session to access said route
const protectRoute = (req, res, next) => {
  const authUser = { ...req.session.user };

  if (!authUser || authUser.email || authUser.id) {
    return res.redirect("/logout");
  }

  req.authUser = authUser;
  return next();
};

module.exports = { isSessionAuthorized, protectRoute };
