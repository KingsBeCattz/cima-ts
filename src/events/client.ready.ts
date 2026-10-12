import { ActivitiesOptions, ActivityType, PresenceData } from "discord.js";
import { log } from "..";
import { EventBuilder } from "../builders/event.builder";

const STATUSES: ActivitiesOptions[] = [
  { name: 'Expulsando a SAFIM', type: ActivityType.Competing },
  { name: 'Verificando usuarios...', type: ActivityType.Watching },
  { name: 'Salvando Inglés II', type: ActivityType.Playing },
  { name: 'Sobreviviendo a parciales', type: ActivityType.Competing },
  { name: 'Buscando el salón', type: ActivityType.Watching },
  { name: 'Haciendo la tarea a las 11:59', type: ActivityType.Playing },
  { name: 'Esperando al profe', type: ActivityType.Watching },
  { name: 'Evitando extraordinarios', type: ActivityType.Competing },
  { name: 'Peleando con SERNA', type: ActivityType.Competing },
  { name: 'Salvando Cálculo Multivariable', type: ActivityType.Competing },
];

export default new EventBuilder({
  name: "clientReady",
  once: false,
  code: async (client) => {
    log.note(`Conexión`, `Conectado a Discord como ${client.user.tag} (${client.user.id})`);

    let index = 0;

    const apply = () => {
      const status = STATUSES[index];
      client.user.setPresence({
        activities: [status],
        status: 'online'
      });
      index = (index + 1) % STATUSES.length;
    };

    // Set the first status immediately, then rotate on an interval
    apply();
    setInterval(apply, Number(process.env.STATUS_ROTATE_MS) || 30_000);
  }
});