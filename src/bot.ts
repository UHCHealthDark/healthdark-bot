import { GatewayIntentBits } from "discord.js";
import Client from "./struct/client";
import configuration from "./util/config";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildMembers
  ]
});

client.login(configuration.token)

export default client;