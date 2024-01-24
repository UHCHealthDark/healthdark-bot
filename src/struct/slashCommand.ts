import { CommandInteraction, Interaction, SlashCommandBuilder } from "discord.js";

export abstract class SlashCommand {
  private readonly command: SlashCommandBuilder;
  private readonly cooldown: number;

  constructor(
    slashCommandBuilder: SlashCommandBuilder,
    cooldown?: number
  ) {
    this.command = slashCommandBuilder;
    this.cooldown = cooldown || 5;
  }

  autoComplete(interaction: Interaction): void {
    return;
  }

  abstract execute(interaction: CommandInteraction): void;

  getBuilder(): SlashCommandBuilder {
    return this.command;
  }

  getCooldown(): number {
    return this.cooldown;
  }
}