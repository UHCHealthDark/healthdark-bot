import { Client, ClientOptions, Collection, REST, Routes } from "discord.js";
import { SlashCommand } from "./slashCommand";
import { readdirSync, statSync } from "fs";
import { join, relative } from "path";
import { Event } from "./event";
import { client as redisClient } from "../redis"
import configuration from "../util/config";

export default class BotClient extends Client  {
  constructor(options: ClientOptions) {
    super(options);
    this.slashCommands = new Collection();
    this.cooldown = new Collection();
    this.redisClient = redisClient;
    this.verifyChannel = "VERIFY"
    this.init();
  }

  private async init(): Promise<boolean> {
    this.initEvents();
    this.initSlashCommands();
  
    return true;
  }

  private async initSlashCommands(directory = '../command') {
    const commandFiles = this.getFiles(directory);

    for (const file of commandFiles) {
      const path = join(directory, file);
      const { default: CommandClass } = await import(path);
      
      const command = new CommandClass() as SlashCommand;
      const commandName = command.getBuilder().name;

      this.slashCommands.set(commandName, command);
    }

    const rest = new REST().setToken(configuration.token);

    (async () => {
      try {
        console.log(`Cargando ${this.slashCommands.size} comando(s) en total.`)

        const data: any = await rest.put(
          Routes.applicationCommands(configuration.clientId),
          { body: this.slashCommands.map(command => command.getBuilder().toJSON())}
        )
        
        console.log(`Se han cargado ${data.length} comando(s) en total`)
      } catch (error) {
        console.error(error)
      }
    })();
  }

  private async initEvents(directory = '../event') {
    const eventFiles = this.getFiles(directory);

    for (const file of eventFiles) {
      const path = join(directory, file);
      const { default: EventClass } = await import(path);
      const event = new EventClass() as Event

      if (event.isOnce()) {
        this.once(event.getName(), (...args) => event.execute(this, ...args));
        return;
      }

      this.on(event.getName(), (...args) => event.execute(this, ...args));
    }
  }

  private getFiles(directory: string): string[] {
    const files: string[] = [];

    const readDirectory = (dir: string) => {
      const directoryFiles = readdirSync(dir);
      for (const file of directoryFiles) {
        const path = join(dir, file);
        const stat = statSync(path);

        if (stat.isDirectory()) {
          readDirectory(path)
        } else if (file.endsWith('.js') || file.endsWith('.ts')) {
          files.push(relative(__dirname, path))
        }
      }
    }

    readDirectory(join(__dirname, directory))
    
    return files;
  }
}