import { SubCommandBuilder } from "../../builders/sub.command.builder";
import { SlashCommandSubcommandBuilder } from "discord.js";

export default new SubCommandBuilder({
  slash: new SlashCommandSubcommandBuilder()
    .setName("count")
    .setDescription("Selecciona un canal para el conteo"),
  code: async (ctx) => {
  }
});