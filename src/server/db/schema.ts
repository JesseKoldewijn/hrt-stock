// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  bigint,
  index,
  mysqlTableCreator,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator(
  (name) => `hrt-countries.jkinsight.nl_${name}`,
);

export const countries = mysqlTable(
  "countries",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    nameCommon: varchar("name_common", { length: 256 }),
    nameOfficial: varchar("name_official", { length: 256 }),
    nameNative: varchar("name_native", { length: 256 }),
    cca2: varchar("cca2", { length: 256 }),
    cca3: varchar("cca3", { length: 256 }),
    currencies: varchar("currencies", { length: 256 }),
    timeZones: varchar("time_zones", { length: 256 }),
    flags: varchar("flags", { length: 556 }),
  },
  (c) => ({
    countryIndex: index("country_idx").on(c.id),
  }),
);

export const stocks = mysqlTable(
  "stocks",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    country: varchar("country", { length: 256 }),
    brand: varchar("brand", { length: 256 }),
    type: varchar("type", { length: 256 }),
    desc: varchar("description", { length: 256 }),
    stock: bigint("stock", { mode: "number" }),
    location: varchar("location", { length: 256 }),
  },
  (c) => ({
    stockIndex: index("stock_idx").on(c.id),
  }),
);
