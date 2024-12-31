CREATE TABLE `posts` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`text` varchar(300) NOT NULL,
	`user` int,
	CONSTRAINT `posts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `posts` ADD CONSTRAINT `posts_user_users_id_fk` FOREIGN KEY (`user`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;