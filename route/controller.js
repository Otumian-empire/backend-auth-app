const Profile = require("../db/models");
const logger = require("../configs/logger");

const profileController = async (req, res) => {
  try {
    const id = req.session.user.id;
    const isActive = id || false;

    const profile = await Profile.findById(id);

    return res.render("profile", { profile, isActive });
  } catch (error) {
    logger.error(error.message);
    return res.redirect("/logout");
  }
};

const profileUpdateController = async (req, res) => {
  try {
    const id = req.session.user.id;
    const isActive = id || false;

    const profile = await Profile.findById(id);

    return res.render("profile_update", { profile, isActive });
  } catch (error) {
    logger.error(error.message);
    return res.redirect("/");
  }
};

const updatePasswordController = async (req, res) => {
  try {
    const id = req.session.user.id;
    const isActive = id || false;

    const profile = await Profile.findById(id);

    return res.render("password_update", { profile, isActive });
  } catch (error) {
    logger.error(error.message);
    return res.redirect("/");
  }
};

const logoutController = (req, res) => {
  let redirectUrl = "/login";

  try {
    if (req.session.user && req.session.user.id && req.session.user.email) {
      redirectUrl += `?email=${req.session.user.email}`;
    }

    res.clearCookie("connect.sid");
    delete req.session;
  } catch (error) {
    logger.error(error.message);
  } finally {
    return res.redirect(redirectUrl);
  }
};

module.exports = {
  profileController,
  profileUpdateController,
  updatePasswordController,
  logoutController,
};
