import { ContainerBuilder, EmbedBuilder, MessageFlags, SlashCommandBuilder, TextDisplayBuilder } from "discord.js";
import { CommandBuilder, CommandCategory } from "../../builders/command.builder";

export default new CommandBuilder({
  slash: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Responde con el estado del bot!"),
  category: CommandCategory.Utility,
  code: async (ctx) => {
    const receivedAt = Date.now();
    const gatewayDelay = Math.max(0, receivedAt - ctx.interaction.createdTimestamp);

    // Defer reply to prevent interaction timeout
    await ctx.interaction.deferReply();

    const acknowledgementDelay = Date.now() - receivedAt;
    const wsPing = ctx.client.ws.ping;

    // Calculate uptime
    const uptime = Date.now() - ctx.client.readyTimestamp;
    const hours = Math.floor(uptime / (1000 * 60 * 60));
    const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
    const uptimeFormatted = `${hours}h ${minutes}m`;

    const embed = new EmbedBuilder()
      .setTitle("Pong!")
      .setDescription("El bot está funcionando correctamente!")
      .addFields(
        { name: "Llegada del comando", value: `${gatewayDelay}ms`, inline: true },
        { name: "Confirmación de Discord", value: `${acknowledgementDelay}ms`, inline: true },
        { name: "WebSocket", value: `${wsPing}ms`, inline: true },
        { name: "Uptime", value: `${uptimeFormatted}`, inline: true }
      );
    await ctx.interaction.followUp({
      embeds: [embed]
    });
  }
});
