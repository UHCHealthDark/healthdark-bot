import { connect } from "mongoose";
import configuration from "./util/config";

(async () => {
  try {
    await connect(configuration.mongoUri);
    console.log("Se ha conectado correcatamente a la DB")
  } catch (error) {
    console.error("Ocurrio un error al conectar a la DB.", error)
  }
})();