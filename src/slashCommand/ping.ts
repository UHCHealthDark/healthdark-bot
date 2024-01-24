import { CommandInteraction, EmbedBuilder, Interaction, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../struct/slashCommand";
import { ColorUtil } from "../util/color";

export default class PingCommand extends SlashCommand {
  constructor() {
    super(
      new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Hola")
    )
  }

  execute(interaction: CommandInteraction): void {
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`🏓 Pong! \n 📡 Ping: ${interaction.client.ws.ping}`)
          .setColor(ColorUtil.getColor("text"))
      ]
    })
  }
}