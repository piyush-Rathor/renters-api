import jwt from "jsonwebtoken";
import Otp from "../models/otp.model.js";
import User from "../models/user.model.js";
import { sendMessage } from "../configs/nexmo.js";
import constants, { messageOtpForAuth } from "../configs/constants.js";

export const userAuth = async (req, res, next) => {
  try {
    const { mobileNumber } = req.body;
    const otp = 123456 || Math.floor(100000 + Math.random() * 900000);
    if (mobileNumber.length == 10) {
      // for india
      sendMessage(`+91${mobileNumber}`, messageOtpForAuth(otp));
    } else {
      // for Dubai
      sendMessage(`+971${mobileNumber}`, messageOtpForAuth(otp));
    }
    const user = await User.findOne({ where: { mobileNumber: mobileNumber } });
    if (user) {
      user.otp = otp;
      await user.save();
    } else {
      const otpObj = await Otp.findOne({
        where: { mobileNumber: mobileNumber },
      });
      if (otpObj) {
        otpObj.otp = otp;
        await otpObj.save();
      } else {
        await Otp.create({ mobileNumber, otp });
      }
    }
    return res.success("Otp Send Successfully");
  } catch (error) {
    return res.error(error.message);
  }
};

export const userAuthConfirm = async (req, res, next) => {
  try {
    const { mobileNumber, otp } = req.body;
    let user = await User.findOne({ where: { mobileNumber: mobileNumber } });
    if (user) {
      if (!user.otp) return res.warning(`We didn't send any otp to you`);
      if (otp != user.dataValues.otp) return res.warning(`Otp Not Match`);
      user.otp = 0;
      await user.save();
      return res.success("Your Account is created Successfully", {
        token: jwt.sign({ id: user.id }, constants.JWT_SECRET),
        userAllReadyRegistered: true,
      });
    } else {
      const otpOldObj = await Otp.findOne({
        where: { mobileNumber: mobileNumber },
      });
      if (!otpOldObj)
        return res.warning("No Data found with this mobile number");
      if (otp != otpOldObj.dataValues.otp) return res.warning(`Otp Not Match`);
      user = await User.create({ mobileNumber: mobileNumber });
      await Otp.destroy({ where: { mobileNumber: mobileNumber, otp: 0 } });
    }
    return res.success("Your Account is created Successfully", {
      token: jwt.sign({ id: user.id }, constants.JWT_SECRET),
      userAllReadyRegistered: false,
    });
  } catch (error) {
    return res.error(error.message);
  }
};
