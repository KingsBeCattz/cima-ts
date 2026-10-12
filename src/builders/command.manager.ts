import { Collection, REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from "discord.js";
import { CommandBuilder } from "./command.builder";
import { join } from "path";
import { readFileSync, writeFileSync } from "fs";
import { log } from "..";
import { directoryReader } from "../readers/directory.reader";

export class CommandManager {
  public commands: Collection<string, CommandBuilder> = new Collection();
  public cacheFile = ".cache.json";
  private rest = new REST().setToken(process.env.DISCORD_TOKEN!);

  constructor (public directory: string) { }

  public async loadCommands() {
    log.note("Command Manager", `Loading commands from ${this.directory}...`);
    await directoryReader(this.directory, async (command: { default?: CommandBuilder; }, meta) => {
      if (!meta.file.endsWith(".ts") || meta.file.startsWith(".")) {
        return;
      }
      if (!command.default) {
        log.warn("Command Reader", `El comando ${meta.file} no tiene un export default.`);
        return;
      }
      const { slash, code } = command.default;
      if (!slash || !code) {
        log.warn("Command Reader", `El comando ${meta.file} no tiene un slash o código válido.`);
        return;
      }

      this.commands.set(slash.name, command.default);
      log.note("Command Reader", `Comando ${slash.name} cargado desde ${meta.path}`);
    });
  }

  public get dumpCommandsJSON(): RESTPostAPIChatInputApplicationCommandsJSONBody[] {
    return this.commands.map(command => command.toJSON);
  }

  public updateCache() {
    const cachePath = join(this.directory, this.cacheFile);
    writeFileSync(cachePath, JSON.stringify(this.dumpCommandsJSON, null, 2));
    return this.dumpCommandsJSON;
  }

  public get getCache(): RESTPostAPIChatInputApplicationCommandsJSONBody[] {
    const cachePath = join(this.directory, this.cacheFile);
    try {
      const cacheData = JSON.parse(readFileSync(cachePath, "utf-8"));
      return cacheData;
    }
    catch (error) {
      writeFileSync(cachePath, "[]");
      return [];
    }
  }

  /**
   * If the cache file exists, compare it with the current commands and return true if they are the same, false otherwise.
   * In case they are different, the cache file must be updated with the current commands.
   * @returns True if the cache file exists and is the same as the current commands, false otherwise.
   */

  public compareCache(): boolean {
    const cachePath = join(this.directory, this.cacheFile);
    try {
      const cacheData = JSON.parse(readFileSync(cachePath, "utf-8"));
      const currentData = this.dumpCommandsJSON;
      return JSON.stringify(cacheData) === JSON.stringify(currentData);
    }
    catch (error) {
      return false;
    }
  }

  public async deployCommands() {
    log.note("Command Manager", "Deploying commands...");
    if (this.commands.size === 0) {
      log.warn("Command Manager", "No commands to deploy.");
      return;
    }
    if (this.compareCache()) {
      log.note("Command Manager", "Commands are up to date, no need to update cache.");
      return;
    }

    log.note("Command Manager", "Commands have changed, updating cache...");
    let commands = this.updateCache();

    const data = await this.rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!), { body: commands });

    log.note("Command Manager", `Successfully reloaded ${(data as any[]).length} application (/) commands.`);
  }
}