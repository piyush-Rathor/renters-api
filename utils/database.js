import Sequelize from "sequelize";
import constants from "../configs/constants.js";

const sequelize = new Sequelize(
  constants.DB.database,
  constants.DB.user,
  constants.DB.password,
  {
    dialect: constants.DB.dialect,
    host: constants.DB.host,
  }
);
export default sequelize;
