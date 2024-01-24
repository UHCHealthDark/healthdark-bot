import { CommandInteraction, EmbedBuilder, Interaction, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../struct/slashCommand"; 
import { User } from "../database/schema/user";
import { verifyUsers } from "../redis";

export default class PingCommand extends SlashCommand {
  constructor() {
    super(
      new SlashCommandBuilder()
        .setName("unlink")
        .setDescription("Comando para poder verificarte en el server.")
    )
  }

  async execute(interaction: CommandInteraction): Promise<void> {
    const user = await User.findOne({ id: interaction.user.id });

    if (user == null) {
      await interaction.reply({
        content: "No te encuentras verificado",
        ephemeral: true
      })
      return;
    }

    await user.deleteOne();
    await interaction.reply({
      content: "Has sido desvinculado correctamente.",
      ephemeral: true
    })
  }
}