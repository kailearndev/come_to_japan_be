ALTER TABLE "lesson_words" ADD COLUMN "order_index" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "lesson_words" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "lesson_words" DROP COLUMN "updated_at";