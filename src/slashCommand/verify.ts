import { CommandInteraction, EmbedBuilder, GuildMember, Interaction, SlashCommandBuilder } from "discord.js";
import { User } from "../database/schema/user";
import { SlashCommand } from "../struct/slashCommand";
import { verifyUsers } from "../redis";

export default class PingCommand extends SlashCommand {
  constructor() {
    super(
      new SlashCommandBuilder()
        .setName("verify")
        .addStringOption(option => option
          .setName("code")
          .setDescription("Codigo dado en el servidor."))
        .setDescription("Comando para poder verificarte en el server.")
    )
  }

  async execute(interaction: CommandInteraction): Promise<void> {
    const code = interaction.options.get("code")?.value as string;
    const uuid = verifyUsers.get(code) as string;
    const id = interaction.user.id;
    const userExists = await User.findOne({ id: interaction.user.id });
    const member = interaction.member as GuildMember;
    const rolId = member.roles.highest?.id;

    if (rolId == null) {
      return;
    }

    const user = new User({
      id,
      uuid,
      rolId
    })

    if (userExists != null) {
      await interaction.reply({
        content: "Ya te encuentras verificado",
        ephemeral: true
      })
      return;
    }

    if (!verifyUsers.has(code)) {
      await interaction.reply({
        content: "El codigo dado no es valido.",
        ephemeral: true
      })
      return;
    }

    verifyUsers.delete(code);

    await user.save();
    await interaction.reply({
      content: "Has sido verificado correctamente.",
      ephemeral: true
    });
  }
}