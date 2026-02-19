import query_db from "./query_database.ts";

export async function random_reply(): Promise<string> {
    const result = await query_db("replyMessages[*] | random 1");
    if (result == null) {
        return "database failiure";
    }
    return result.data[0].reply_message;
}

export async function random_react(): Promise<string> {
    const result = await query_db("reactEmojis[*] | random 1");
    if (result == null) {
        return "database failiure";
    }
    return result.data[0].react_emoji;
}
