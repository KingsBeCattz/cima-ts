import { EmbedBuilder, SlashCommandBuilder, SlashCommandSubcommandBuilder } from "discord.js";
import { CommandBuilder, CommandCategory } from "../../builders/command.builder";

export default new CommandBuilder({
  slash: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Comandos relacionados al servidor.")
    .addSubcommand(new SlashCommandSubcommandBuilder()
      .setName("info")
      .setDescription("Muestra información del servidor.")
    )
  ,
  category: CommandCategory.Utility,
  code: async (ctx) => {
    const guild = ctx.guild;

    switch (ctx.interaction.options.getSubcommand()) {
      case "info": {
        const embed = new EmbedBuilder().setTitle(`Información del servidor: ${guild.name}`)
          .setThumbnail(guild.iconURL()!)
          .addFields(
            { name: "ID", value: guild.id, inline: true },
            { name: "Miembros", value: `${guild.memberCount}`, inline: true },
            { name: "Dueño", value: `<@${guild.ownerId}>`, inline: true },
            { name: "Creado el", value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`, inline: true },
            { name: "Roles", value: `${guild.roles.cache.size}`, inline: true },
            { name: "Canales", value: `${guild.channels.cache.size}`, inline: true },
          )
          .setColor('Random');

        if (guild.bannerURL()) {
          embed.setImage(guild.bannerURL()!);
        }
        await ctx.interaction.reply({
          embeds: [
            embed
          ],
        });
      }
        break;
      default:
        throw new Error("Subcomando no reconocido.");
        break;
    }

  }
});