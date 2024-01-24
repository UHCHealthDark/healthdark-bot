import Client from "../struct/client";
import { Event } from "../struct/event";

export default class ReadyEvent extends Event {
  constructor() {
    super('ready', true)
  }
  
  execute(client: Client): void {
    console.log(`Bot inicializado correctamente. | ${client.user?.username}`)
  }
}