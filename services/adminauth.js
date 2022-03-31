import jwt from "jsonwebtoken";
import chalk from "chalk";
import constants from "../configs/constants.js";
import Adminuser from "../models/adminuser.model.js";

export const adminVerify = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    console.log(token);
    if (token) {
      jwt.verify(token, constants.JWT_SECRET, async function (err, decoded) {
        if (err) {
          return res.unauthorizedUser();
        } else {
          req.decoded = decoded.adminUser;
          let user = await Adminuser.findOne({
            where: { email: req.decoded.email },
          });
          if(!user) return res.unauthorizedUser()
          res.locals.adminUser = user;
          console.log("next");
          return await next();
        }
      });
    } else {
      console.log(chalk.red(`Access Token missing`));
      return res.unauthorizedUser();
    }
  } catch (e) {
    if (/invalid token/i.test(e)) return res.unauthorizedUser();
    return res.error(e);
  }
};
