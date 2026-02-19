export default async function query_db(query: string):Promise<any> {
    const result = await fetch(`${process.env.DB_URL}?password=${process.env.DB_PASSWORD}`, {
        method: "POST",
        body: query,
    }).then(res => {
        if (!res.ok) {
            return null;
        }
        return res.json();
    });
    return result;
}
