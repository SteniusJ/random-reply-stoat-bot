import query_db from "./query_database.ts";

export async function random_reply(): Promise<string> {
    try {
        const result = await query_db("replyMessages[*] | random 1");
        if (result == null) {
            return "database failiure";
        }
        return result.data[0].reply_message;
    } catch(err) {
        console.error(err);
    }
}

export async function random_react(): Promise<string> {
    try {
        const result = await query_db("reactEmojis[*] | random 1");
        if (result == null) {
            return "database failiure";
        }
        return result.data[0].react_emoji;
    } catch(err) {
        console.error(err);
    }
}
