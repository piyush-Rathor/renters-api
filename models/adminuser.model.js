import Sequelize from "sequelize";
import { adminCredentials } from "../configs/constants.js";
import chalk from "chalk";
import sequelize from "../utils/database.js";
import bcryptjs from "bcryptjs";

const adminuser = sequelize.define("adminuser", {
  mobileNumber: {
    type: Sequelize.STRING,
    trim: true,
    default: 0,
  },
  email: {
    type: Sequelize.STRING,
    trim: true,
  },
  password: {
    type: Sequelize.STRING,
    trim: true,
  },
  name: {
    type: Sequelize.STRING,
    trim: true,
  },
});
await adminuser.sync({ force: true });

try {
  if (
    !(await adminuser.findOne({ where: { email: adminCredentials.email } }))
  ) {
    await adminuser.create({
      email: adminCredentials.email,
      password: bcryptjs.hashSync(
        adminCredentials.password,
        bcryptjs.genSaltSync(13)
      ),
      name: adminCredentials.name,
    });
  }
} catch (error) {
  console.log(
    chalk.redBright(
      "Error while creating the Admin Account Make Sure Credencial Must Present in .env:" +
        error.message
    )
  );
}

export default adminuser;
