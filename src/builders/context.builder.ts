import type { Client, ChatInputCommandInteraction } from "discord.js";
import { Util } from "../utils/util";

export class Context {
  public util: Util = new Util();
  constructor (public interaction: ChatInputCommandInteraction) { }

  get client() {
    return this.interaction.client;
  }

  get user() {
    return this.interaction.user;
  }

  get member() {
    return this.interaction.member!;
  }

  get guild() {
    return this.interaction.guild!;
  }
}