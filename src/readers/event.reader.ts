import { Client } from "discord.js";
import { directoryReader } from "./directory.reader";
import { log } from "..";
import { EventBuilder } from "../builders/event.builder";

export async function eventReader(
  client: Client,
  dir: string,
) {
  await directoryReader(dir, async (event: {default?: EventBuilder<any>}, meta) => {
    if (!event.default) {
      log.warn("Event Reader", `El evento ${meta.file} no tiene un export default.`);
      return;
    }
    const { name, once, code } = event.default;
    if (!name || !code) {
      log.warn("Event Reader", `El evento ${meta.file} no tiene un nombre o código válido.`);
      return;
    }
    if (once) {
      client.once(name, code);
    }
    else {
      client.on(name, code);
    }
    log.note("Event Reader", `Evento ${name} cargado desde ${meta.path}`);
  });
}