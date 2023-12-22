import { drizzle } from "drizzle-orm/mysql2";

import { env } from "@/env";

import { createConnection } from "mysql2/promise";

const connection = await createConnection({
  uri: env.DATABASE_URL,
  port: 3306,
  ssl: "false",
});

export const db = drizzle(connection);
