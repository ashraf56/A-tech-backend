import mongoose from "mongoose";
import app from "./app";
import config from "./app/config/config";



async function mainEngine() {
  try {
    await mongoose.connect(`${config.Database_url}`);

    app.listen(config.PORT, () => {
      console.log(`app is listening on Port ${config.PORT}`);
    });
  } catch (error) {
    console.log(error);

  }
}


mainEngine()