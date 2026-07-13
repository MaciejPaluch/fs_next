CREATE TABLE "read_books" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"book_id" integer
);
--> statement-breakpoint
ALTER TABLE "read_books" ADD CONSTRAINT "read_books_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "read_books" ADD CONSTRAINT "read_books_book_id_blogs_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."blogs"("id") ON DELETE no action ON UPDATE no action;