import { EmbedBuilder, SlashCommandBuilder, SlashCommandSubcommandBuilder } from "discord.js";
import { CommandBuilder, CommandCategory } from "../../builders/command.builder";



export default new CommandBuilder({
  slash: new SlashCommandBuilder()
    .setName("config")
    .setDescription("Comandos de configuración del bot.")
    .setDefaultMemberPermissions((1 << 4)),
  category: CommandCategory.Configuration,
  code: async (ctx) => {

  }
});