import { drizzle } from "drizzle-orm/node-postgres";

import { env } from "@/env";

import { Client } from "pg";

const connection = new Client({
  connectionString: env.DATABASE_URL,
  ssl: false,
});

export const db = drizzle(connection);
