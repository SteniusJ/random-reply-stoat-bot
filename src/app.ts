import { Client } from "stoat.js";
import "dotenv/config";
import { random_reply, random_react } from "./functions/reply_functions.ts";
import CommandHandler from "./functions/handle_commands.ts";

let client = new Client();
let command_handler = new CommandHandler();

const reply_chance: number = (process.env.REPLY_CHANCE as unknown) as number;
const react_chance: number = (process.env.REACT_CHANCE as unknown) as number;

client.on("ready", async () => {
    console.info(`Logged in as ${client.user.username}`);
});

client.on("messageCreate",  async (message) => {
    if (command_handler.call(message)) {
        return;
    }

    if (message.mentioned) {
        const reply = await random_reply();
        message.reply(reply).catch((reason) => {
            console.error(reason);
        });
        return;
    }

    if (Math.floor(Math.random() * reply_chance) == 1 && !message.author.bot) {
        const reply = await random_reply();
        message.reply(reply).catch((reason) => {
            console.error(reason);
        });
    }
    if (Math.floor(Math.random() * react_chance) == 1 && !message.author.bot) {
        const [reaction, index] = await random_react();
        
        if (reaction == null) {
            return;
        }

        message.react(reaction).catch((reason) => {
            message.reply(`react emoji at index: {${index}} is not in correct syntax for stoat`).catch((reason) => {
                console.error(reason);
            });
            console.error(reason);
        });
    }
});

client.loginBot(process.env.BOT_TOKEN);
