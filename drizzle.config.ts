import { type Config } from "drizzle-kit";

import { env } from "@/env";

export default {
  schema: "./src/server/db/schema.ts",
  driver: "mysql2",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
    database: "hrt-countries",
  },
  // This is added to make sure that the database can be used for multiple projects
  tablesFilter: ["hrt-countries.jkinsight.nl_*"],
} satisfies Config;
