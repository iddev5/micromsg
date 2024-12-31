CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`username` varchar(20) NOT NULL,
	`hash` char(64) NOT NULL,
	`salt` char(32) NOT NULL,
	`email` varchar(64) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
