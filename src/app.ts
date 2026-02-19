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
    if (command_handler.handle_commands(message)) {
        return;
    }

    if (message.mentioned) {
        const reply = await random_reply();
        message.reply(reply);
        return;
    }

    if (Math.floor(Math.random() * reply_chance) == 1 && !message.author.bot) {
        const reply = await random_reply();
        message.reply(reply);
    }
    if (Math.floor(Math.random() * react_chance) == 1 && !message.author.bot) {
        const reaction = await random_react();
        message.react(reaction);
    }
});

client.loginBot(process.env.BOT_TOKEN);
