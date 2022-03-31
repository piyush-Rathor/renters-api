import Nexmo from "nexmo";
import constants from "../configs/constants.js";

const nexmo = new Nexmo({
  apiKey: constants.Nexmo.API_KEY,
  apiSecret: constants.Nexmo.API_SECRET,
});
export const sendMessage = async (to, message) => {
  try {
    await nexmo.message.sendSms("Renters", to, message);
  } catch (error) {
    throw error;
  }
};
