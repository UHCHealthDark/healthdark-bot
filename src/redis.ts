import { RedisClientType, createClient } from "redis";
import configuration from "./util/config";

export let client: RedisClientType;
export let verifyUsers: Map<string, string>;

(async () => {
  try {
    client = createClient({
      socket: {
        host: configuration.redisUrl,
        port: configuration.redisPort
      },
      username: configuration.redisUser,
      password: configuration.redisPassword,
    });

    verifyUsers = new Map();
  
    console.log("Se conecto a redis correctamente.")

    await client.connect();

    const subscriber = client.duplicate()

    await subscriber.connect();
    await subscriber.subscribe("discord", (message) => {
      const uuid = message.split(":")[0]; 
      const code = message.split(":")[1];

      verifyUsers.set(code, uuid);
    })
  } catch {
    console.error("Hubo un error al conectarse a Redis.")
  }
})();
