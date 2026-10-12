import type { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";
import { Context } from "./context.builder";

export enum CommandCategory {
  Moderation = "Moderation",
  Fun = "Fun",
  Utility = "Utility",
  Configuration = "Configuration",
  Developers = "Developers"
};

export type SlashBuilder = SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;

export type CommandBuilderOptions = {
  slash: SlashBuilder;
  category: CommandCategory;
  code: (context: Context) => Promise<void>;
};

export class CommandBuilder {
  slash: SlashBuilder;
  category: CommandCategory;
  code: (context: Context) => Promise<void>;

  constructor (options: CommandBuilderOptions) {
    this.slash = options.slash;
    this.category = options.category;
    this.code = options.code;
  }

  public get toJSON() {
    return this.slash.toJSON();
  }
}