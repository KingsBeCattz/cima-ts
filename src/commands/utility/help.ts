import { SlashCommandBuilder } from "discord.js";
import { CommandBuilder, CommandCategory } from "../../builders/command.builder";

export default new CommandBuilder({
  slash: new SlashCommandBuilder()
    .setName("ayuda")
    .setDescription("Muestra los comandos del bot con su descripción entre otras cosas!"),
  category: CommandCategory.Utility,
  code: async (ctx) => {
    throw new Error("Not implemented yet.");
  }
});