import { CommandInteraction, EmbedBuilder, Interaction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../struct/slashCommand";

export default class PingCommand extends SlashCommand {
  constructor() {
    super(
      new SlashCommandBuilder()
        .setName("playerhead")
        .addStringOption(option => option
          .setName("name")
          .setDescription("Nombre del usuario premium."))
        .addStringOption(option => option
          .setName("emoji-name")
          .setDescription("Nombre del emoji."))
        .setDescription("Crea una cabeza para el jugador.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    )
  }

  async execute(interaction: CommandInteraction): Promise<void> {
    const headName = interaction.options.get("name")?.value as string;
    const name = interaction.options.get("emoji-name")?.value as string;
    const guild = interaction.guild;

    if (guild == null || name == null || headName == null) {
      return;
    }

    try {
      await guild.emojis.create({
        name,
        attachment: `https://mc-heads.net/avatar/${headName}`
      })
  
      interaction.reply("Se ha creado la head correctamente.")
    } catch (error) {
      console.log(error)
      interaction.reply("Hubo un error al crear la head.")
    }
  }
}