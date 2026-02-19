import query_db from "./query_database.ts";

export default class CommandHandler {
    commands: Map<string, { (message: any):Promise<void>; }>;

    handle_commands(message):boolean {
        if (message.content.charAt(0) == "/") {
            let command_name = message.content.substring(1, message.content.length);

            let command = this.commands.get(command_name);
            if (command == undefined) {
                return false;
            }
            command(message);
            return true;
        }
        return false;
    };

    constructor() {
        this.commands = new Map();

        this.commands.set("game", async (message) => {
            const result = await query_db("gameMessages[*] | random 1");

            if (result == null) {
                message.reply("database error");
            }
            message.reply(result.data[0].game_message);;
        });

        this.commands.set("gregflip", async (message) => {
            if (Math.random() > 0.5) {
                message.reply("Gregs");
            } else {
                message.reply("Tails");
            }
        });
    }
}
