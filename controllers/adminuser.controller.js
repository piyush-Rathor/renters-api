import jwt from "jsonwebtoken";
import constants from "../configs/constants.js";
import Adminuser from "../models/adminuser.model.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const adminAserAuth = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const adminUser = await Adminuser.findOne({ where: { email } });
    if (!adminUser) return res.warning("No Admin User Found with this Email!");
    if (!bcryptjs.compareSync(password, adminUser.password))
      return res.unauthorizedUser("Password is incorrect");
    return res.success("Log in Successfully", {
      token: jwt.sign({ adminUser }, constants.JWT_SECRET),
    });
  } catch (error) {
    return res.error(error.message);
  }
};

export const getAllTenants = async (req, res, next) => {
  try {
    const users = await User.findAll({ order: [ [ 'createdAt', 'DESC' ]]});
    const totalCount = await User.count();
    return res.success("Users", { users, totalCount });
  } catch (error) {
    return res.error(error.message);
  }
};

export const getTenant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) return res.unauthorizedUser("User Not Found");
    return res.success("User", user);
  } catch (error) {
    return res.error(error.message);
  }
};
