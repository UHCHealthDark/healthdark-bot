import { Interaction } from "discord.js";
import { Event } from "../struct/event";
 
export default class InteractionCreateEvent extends Event {
  constructor() {
    super('interactionCreate')
  }

  execute(interaction: Interaction): void {
    if (!interaction.isChatInputCommand()) {
      return;
    }

    const commandName = interaction.commandName;
    const command = interaction.client.slashCommands.get(commandName);

    if (!command) {
      return;
    }

    command.execute(interaction);
  }
}