import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  stripeSessionId: varchar("stripe_session_id", { length: 255 }).notNull(), 
  status: varchar("status", { length: 50 }).notNull().default("pending"), // ✅ Add .notNull()
  amount: integer("amount").notNull(),
});

