import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, unique, serial, varchar, int, char } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const posts = mysqlTable("posts", {
	id: serial().notNull(),
	text: varchar({ length: 300 }).notNull(),
	user: int(),
},
(table) => {
	return {
		postsId: primaryKey({ columns: [table.id], name: "posts_id"}),
		id: unique("id").on(table.id),
	}
});

export const users = mysqlTable("users", {
	id: serial().notNull(),
	username: varchar({ length: 20 }).notNull(),
	hash: char({ length: 64 }).notNull(),
	salt: char({ length: 32 }).notNull(),
	email: varchar({ length: 64 }).notNull(),
},
(table) => {
	return {
		usersId: primaryKey({ columns: [table.id], name: "users_id"}),
		id: unique("id").on(table.id),
	}
});
