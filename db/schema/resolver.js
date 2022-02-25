const bcrypt = require("bcrypt");

const Profile = require("../models");
const { ROUNDS } = require("../../configs/app.config");
const logger = require("../../configs/logger");

const createProfile = async (_, args, request) => {
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

    request.session.user = {
      id: newUser._id.toString(),
      email: newUser.email,
    };

    await request.session.save();

    return {
      success: true,
      message: "Signup successful",
    };
  } catch (error) {
    logger.error(error.message);
    return {
      success: false,
      message: error.message,
    };
  }
};

const updateProfile = async (_, args, request) => {
  try {
    const id = request.session.user.id;
    const { name, bio, phone, email } = args;

    const updatedUser = await Profile.updateOne(
      { id },
      { name, bio, phone, email }
    );

    if (!updatedUser) {
      return {
        success: false,
        message: "Update unsuccessful",
      };
    }

    return {
      success: true,
      message: "Update successful",
    };
  } catch (error) {
    logger.error(error.message);
    return {
      success: false,
      message: error.message,
    };
  }
};

const updateProfilePassword = async (_, args, request) => {
  try {
    const id = request.session.user.id;
    const { password } = args;

    const hash = await bcrypt.hash(password, ROUNDS);
    const updatedUser = await Profile.updateOne({ id }, { password: hash });

    if (!updatedUser) {
      return {
        success: false,
        message: "Update unsuccessful",
      };
    }

    return {
      success: true,
      message: "Update successful",
    };
  } catch (error) {
    logger.error(error.message);
    return {
      success: false,
      message: error.message,
    };
  }
};

const loginUser = async (_, args, request) => {
  try {
    const { email, password } = args;

    const user = await Profile.findOne({ email });

    if (!user) {
      return {
        success: false,
        message: "Invalid credentials",
      };
    }

    const matches = await bcrypt.compare(password, user.password);

    if (!matches) {
      return {
        success: false,
        message: "Invalid credentials",
      };
    }

    request.session.user = { email: user.email, id: user.id.toString() };

    await request.session.save();

    return {
      success: true,
      message: "login successful",
    };
  } catch (error) {
    logger.error(error.message);
    return {
      success: false,
      message: error.message,
    };
  }
};

module.exports = {
  createProfile,
  updateProfile,
  updateProfilePassword,
  loginUser,
};
