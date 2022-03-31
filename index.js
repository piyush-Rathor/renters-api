import express from "express";
import chalk from "chalk";

import fs from "fs";
import http from "http";
import https from "https";

const app = express();
import middlewaresConfig, {
  responseMiddleware,
} from "./configs/middlewares.js";
import constants from "./configs/constants.js";
import userRouter from "./routes/user.route.js";
import adminUserRouter from "./routes/adminuser.route.js";
import sequelize from "./utils/database.js";

middlewaresConfig(app);

app.use("/admin", adminUserRouter);
app.use(userRouter);

app.use((req, res, next) => {
  console.log("Page Not found");
  res.status(404).send({ code: 404, message: "Page not found" });
});

responseMiddleware(app);

let server,
  protocol = "";
let appEnv = constants.NODE_ENV;
if (appEnv === "development") {
  protocol = "HTTP";
  server = http.createServer(app);
} else {
  protocol = "HTTPS (Secure)";
  const privateKey = fs.readFileSync("server.key", "utf-8");
  const publicKey = fs.readFileSync("server.cert", "utf-8");
  server = https.createServer(
    {
      key: privateKey,
      cert: publicKey,
    },
    app
  );
}
server.listen(constants.PORT, async () => {
  try {
    await sequelize.sync();
    console.log(
      chalk.blueBright.bold(
        `
            App listen on port: ${constants.PORT} 🍕
            Env: ${constants.NODE_ENV} 🦄
            DB is Connected Successfully ${constants.DB.user}🍕
           `
      )
    );
  } catch (error) {
    console.log(
      chalk.redBright("Error in connetion with DB: " + error.message)
    );
  }
});
