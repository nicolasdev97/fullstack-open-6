ALTER TABLE "users" ALTER COLUMN "password_hash" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "token" text;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_username_unique" UNIQUE("username");