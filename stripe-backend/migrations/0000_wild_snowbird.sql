CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"stripe_session_id" varchar(255) NOT NULL,
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"amount" integer NOT NULL
);
