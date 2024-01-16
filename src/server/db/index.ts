import { drizzle } from "drizzle-orm/mysql2";
import { createConnection } from "mysql2/promise";
import { env } from "@/env";

const connection = await createConnection({
  uri: env.DATABASE_URL,
  /** @bug for some cases you might need to specify the db here as well */
  // database: "hrt-countries",
});

export const db = drizzle(connection);
