import { drizzle } from "drizzle-orm/mysql2";
import { usersTable, postsTable, likesTable, postAnalyticsTable } from "./schema.js"
import dotenv from "dotenv";

dotenv.config();

async function db() {
    return await drizzle(process.env.DATABASE_URL)
}

export default await db();
export {
    usersTable, postsTable, likesTable, postAnalyticsTable
};