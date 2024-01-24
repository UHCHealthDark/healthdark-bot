import * as dotenv from "dotenv";
dotenv.config();

const configuration = {
  token: process.env.TOKEN,
  mongoUri: process.env.MONGO_URI,
  redisUser: process.env.REDIS_USER,
  redisPassword: process.env.REDIS_PASSWORD,
  redisUrl: process.env.REDIS_URL,
  redisPort: process.env.REDIS_PORT,
  guildId: process.env.GUILD_ID,
  clientId: process.env.CLIENT_ID
};

export default configuration;