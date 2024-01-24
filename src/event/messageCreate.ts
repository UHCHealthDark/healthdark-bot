import { Message } from "discord.js";
import { Event } from "../struct/event";
import Client from "../struct/client"

export default class MessageCreateEvent extends Event {
  constructor() {
    super('messageCreate', true)
  }
  
  execute(client: Client , message: Message): void {
    console.log(client)
  }
}