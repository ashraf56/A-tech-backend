/* eslint-disable no-console */
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config/config";



async function mainEngine() {
  try {
    await mongoose.connect(`${config.Database_url}`);
    console.log(' Database connected successfully');
    app.listen(config.PORT, () => {
      console.log(` this server is listening on Port ${config.PORT}`);
    });
  } catch (error) {
    console.log(error);

  }
}


mainEngine()