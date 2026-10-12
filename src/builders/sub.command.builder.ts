import { SlashCommandSubcommandBuilder } from "discord.js";
import { Context } from "./context.builder";

export type SubCommandBuilderOptions = {
  slash: SlashCommandSubcommandBuilder;
  code: (context: Context) => Promise<void>;
};

export class SubCommandBuilder {
  slash: SlashCommandSubcommandBuilder;
  code: (context: Context) => Promise<void>;

  constructor (options: SubCommandBuilderOptions) {
    this.slash = options.slash;
    this.code = options.code;
  }
}