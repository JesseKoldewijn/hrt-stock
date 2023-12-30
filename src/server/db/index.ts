import { drizzle } from "drizzle-orm/mysql2";
import { env } from "@/env";

import { createConnection } from "mysql2/promise";

const connection = await createConnection({
  uri: env.DATABASE_URL,
  database: "hrt-countries",
});

export const db = drizzle(connection);
