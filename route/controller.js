const Profile = require("../db/models");
const logger = require("../configs/logger");

const profileController = async (req, res) => {
  try {
    const id = req.authUser.id;
    const profile = await Profile.findById(id);

    return res.render("profile", { profile });
  } catch (error) {
    logger.error(error.message);
    return res.redirect("/logout");
  }
};

const profileUpdateController = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.authUser.id !== id) {
      throw new Error("profile ID doesn't match the authenticated user ID");
    }

    const profile = Profile.findById(id);

    return res.render("profile_update", { profile });
  } catch (error) {
    logger.error(error.message);
    return res.redirect("/");
  }
};

const updatePasswordController = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.authUser.id !== id) {
      throw new Error("profile ID doesn't match the authenticated user ID");
    }

    const profile = await Profile.findById(id);

    return res.render("password_update", { profile });
  } catch (error) {
    logger.error(error.message);
    return res.redirect("/");
  }
};

const logoutController = (req, res) => {
  let redirectUrl = "/login";

  try {
    const session = { ...req.session.user };

    if (session && session.email) {
      redirectUrl += `?email=${session.email}`;
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
