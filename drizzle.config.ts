import { type Config } from "drizzle-kit";

import { env } from "@/env";

export default {
  schema: "./src/server/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
  // This is added to make sure that the database can be used for multiple projects
  tablesFilter: ["hrt-countries.jkinsight.nl_*"],
} satisfies Config;
