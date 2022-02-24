const bcrypt = require("bcrypt");

const Profile = require("../models");
const { ROUNDS } = require("../../configs/app.config");
const logger = require("../../configs/logger");

const createProfile = async (parent, args) => {
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
    logger.error(error.message);
    return {
      success: false,
      message: "An error occurred",
    };
  }
};

const updateProfile = async (parent, args) => {
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
    logger.error(error.message);
    response.success = false;
    response.message = error.message;
  } finally {
    return response;
  }
};

const updateProfilePassword = async (parent, args) => {
  const response = { success: true, message: "Update successful" };

  try {
    const { id, password } = args;
    const hash = await bcrypt.hash(password, ROUNDS);
    const updatedUser = await Profile.updateOne({ id }, { password: hash });

    if (!updatedUser) {
      response.success = false;
      response.message = "Update unsuccessful";
    }
  } catch (error) {
    logger.error(error.message);
    response.success = false;
    response.message = error.message;
  } finally {
    return response;
  }
};

const findUserById = (parent, args) => {
  return Profile.findById(args.id);
};

module.exports = {
  createProfile,
  updateProfile,
  updateProfilePassword,
  findUserById,
};
