import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config();


export default defineConfig({
  schema: "./db/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: `postgresql://neondb_owner:npg_QIEYmNSAe2J5@ep-raspy-tree-a5q0lbt8-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require`,
  },
});
