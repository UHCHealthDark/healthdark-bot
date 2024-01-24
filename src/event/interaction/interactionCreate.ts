import { EmbedBuilder, Interaction } from "discord.js";
import { Event } from "../../struct/event";
import { ColorUtil } from "../../util/color";
import Client from "../../struct/client"
 
export default class InteractionCreateEvent extends Event {
  constructor() {
    super('interactionCreate')
  }

  execute(client: Client, interaction: Interaction): void {
    if (!interaction.isChatInputCommand()) {
      return;
    }

    const commandName = interaction.commandName;
    const command = interaction.client.slashCommands.get(commandName);

    if (!command) {
      return;
    }

    const cooldownValue = `${commandName}-${interaction.user.id}`;
    const cooldown = interaction.client.cooldown.get(cooldownValue)

    if (command.getCooldown() && cooldown) {
        if (Date.now() < cooldown) {
          interaction.reply({ 
            embeds: [
              new EmbedBuilder()
                .setDescription(`Te encuentras en cooldown espera ${Math.floor(Math.abs(Date.now() - cooldown) / 1000)} segundo(s) para volver usar el comando.`)
                .setColor(ColorUtil.getColor('text'))
            ]
          })
          setTimeout(() => interaction.deleteReply(), 5000);
          return;
        }

        interaction.client.cooldown.set(cooldownValue, Date.now() + command.getCooldown() * 1000)

        setTimeout(() => interaction.client.cooldown.delete(cooldownValue), cooldown * 1000);
    } else if (command.getCooldown() && !cooldown ) {
      interaction.client.cooldown.set(cooldownValue, Date.now() + command.getCooldown() * 1000)
    }

    command.execute(interaction);
  }
}