import { ClientEvents } from "discord.js";

export abstract class Event {
  private readonly name: keyof ClientEvents;
  private readonly once: boolean;

  constructor(
    name: keyof ClientEvents,
    once?: boolean
  ) {
    this.name = name;
    this.once = once || false;
  }

  abstract execute(...args: any): void;

  getName(): keyof ClientEvents {
    return this.name;
  }

  isOnce(): boolean {
    return this.once;
  }
}