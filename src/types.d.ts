import BotClient from "./struct/client"
import { RedisClientType } from "redis"
import { SlashCommand } from "./struct/slashCommand"
import { Collection } from "discord.js"

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string,
      CLIENT_ID: string,
      GUILD_ID: string,
      MONGO_URI: string,
      REDIS_URL: string,
      REDIS_USER: string,
      REDIS_PASSWORD: string
      REDIS_PORT: number
    }
  }
}

declare module 'discord.js' {
  interface Client {
    slashCommands: Collection<string, SlashCommand>;
    cooldown: Collection<string, number>;
    redisClient: RedisClientType;
    verifyChannel: string;
  }
}

export {}