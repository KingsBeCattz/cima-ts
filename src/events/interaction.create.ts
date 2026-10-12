import { CacheType, ChatInputCommandInteraction, InteractionType, MessageFlags } from "discord.js";
import { EventBuilder } from "../builders/event.builder";

import { commands, log } from "../index";
import { Context } from "../builders/context.builder";

export default new EventBuilder({
  name: "interactionCreate",
  once: false,
  code: async (interaction) => {
    switch (interaction.type) {
      case InteractionType.ApplicationCommand: {
        const name = interaction.commandName;
        const command = commands.commands.get(name);

        if (!command) {
          await interaction.deferReply({
            flags: MessageFlags.Ephemeral
          });
          await interaction.followUp({
            content: "Este comando no está disponible.",
          });

          log.warn("Interaction Create", `El comando "${name}" no está disponible. Reiniciando comandos de emergencia...`);
          commands.deployCommands();

          return;
        }

        await (command.code(new Context(interaction as ChatInputCommandInteraction<CacheType>))).catch(async (error) => {
          if (!interaction.deferred) {
            await interaction.deferReply({
              flags: MessageFlags.Ephemeral
            });
          }
          log.fail("Interaction Create", `Error al ejecutar el comando "${name}":`, error);
          await interaction.followUp({
            content: "Ocurrió un error al ejecutar este comando."
          });
        });
      } break;
    }
  }
});