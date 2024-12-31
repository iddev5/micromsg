import { mysqlTable, int, serial, char, varchar, bigint } from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable("users", {
    id: serial().primaryKey(),
    username: varchar({ length: 20 }).notNull(),
    hash: char({ length: 64 }).notNull(),
    salt: char({ length: 32 }).notNull(),
    email: varchar({ length: 64 }).notNull()
});

export const postsTable = mysqlTable("posts", {
    id: serial().primaryKey(),
    text: varchar({ length: 300 }).notNull(),
    user: bigint({ unsigned: true }).references(() => usersTable.id)
});

export const postAnalyticsTable = mysqlTable("post_analytics", {
    id: serial().primaryKey(),
    post: bigint({ unsigned: true }).references(() => postsTable.id),
    likes_count: int().default(0),
});

export const likesTable = mysqlTable("likes", {
    id: serial().primaryKey(),
    post: bigint({ unsigned: true }).references(() => postsTable.id),
    user: bigint({ unsigned: true }).references(() => usersTable.id),
});