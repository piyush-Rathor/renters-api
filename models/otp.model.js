import Sequelize from "sequelize";

import sequelize from "../utils/database.js";

const Otp = sequelize.define("otp", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  mobileNumber: {
    type: Sequelize.STRING,
    trim: true,
  },
  otp: {
    type: Sequelize.INTEGER,
    trim: true,
  },
});
await Otp.sync({force:true});
export default Otp;
