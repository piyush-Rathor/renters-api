import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  SSL_KEY: process.env.SSL_KEY,
  SSL_CERT: process.env.SSL_CERT,
  DB: {
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
    dialect: process.env.DIALECT,
  },
  Nexmo: {
    API_KEY: process.env.NEXMO_API_KEY,
    API_SECRET: process.env.NEXMO_API_SECRET,
  },
};

export const awsCredentials = {
  id: process.env.AWS_ID,
  secret_key: process.env.AWS_SECRET_KEY,
  bucket_name: process.env.AWS_BUCKET_NAME,
};

export const adminCredentials = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
  name:process.env.ADMIN_NAME
};

export const resMessages = {};

export const messageOtpForAuth = (otp) => `Your Otp for Renters app is ${otp}`;
