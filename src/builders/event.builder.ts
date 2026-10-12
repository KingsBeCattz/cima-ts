import type { ClientEvents } from "discord.js";

export interface EventBuilderOptions<Event extends keyof ClientEvents> {
  name: Event;
  once: boolean;
  code: (...args: ClientEvents[Event]) => void;
}

export class EventBuilder<Event extends keyof ClientEvents> {
  public name: Event;
  public once: boolean;
  public code: (...args: ClientEvents[Event]) => void;
  constructor (options: EventBuilderOptions<Event>) {
    this.name = options.name;
    this.once = options.once;
    this.code = options.code;
  }
}