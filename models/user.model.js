import Sequelize from "sequelize";

import sequelize from "../utils/database.js";

const user = sequelize.define("user", {
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
    default:0
  },
});
await user.sync({force:true});

export default user;
