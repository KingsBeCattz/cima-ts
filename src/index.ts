import { Client, GatewayIntentBits, Collection } from "discord.js";
import { sleep } from "bun";
import { Log } from "./utils/logger";
import { eventReader } from "./readers/event.reader";
import { CommandManager } from "./builders/command.manager";
import { CommandBuilder } from "./builders/command.builder";

export const log = new Log(process.env.CLIENT_NAME ?? "CimaBot");

export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers,
    ],
});

export const commands = new CommandManager("./src/commands");

await eventReader(client, "./src/events");
await commands.loadCommands();
await commands.deployCommands();

let loginRetryMs: number = 5_000;

do {
    try {
        await client.login(process.env.DISCORD_TOKEN);
        loginRetryMs = 5_000;
    } catch (error) {
        log.fail("Conexión", `No pude conectar con Discord, reintentaré el inicio en: ${loginRetryMs}ms. MOTIVO DEL ERROR`, String(error));
        sleep(loginRetryMs);
        loginRetryMs = Math.min(loginRetryMs * 2, 60_000);
    }
} while (!client.isReady);