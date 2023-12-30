// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { bigint, mysqlTableCreator, varchar } from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator(
  (name) => `hrt-countries.jkinsight.nl_${name}`,
);

export const countries = mysqlTable("countries", {
  id: bigint("id", { mode: "bigint" }).autoincrement().primaryKey(),
  nameCommon: varchar("name_common", { length: 1500 }),
  nameOfficial: varchar("name_official", { length: 1500 }),
  nameNative: varchar("name_native", { length: 1500 }),
  cca2: varchar("cca2", { length: 1500 }),
  cca3: varchar("cca3", { length: 1500 }),
  currencies: varchar("currencies", { length: 1500 }),
  timeZones: varchar("time_zones", { length: 1500 }),
  flags: varchar("flags", { length: 1500 }),
});

export const stocks = mysqlTable("stocks", {
  id: bigint("id", { mode: "bigint" }).autoincrement().primaryKey(),
  country: varchar("country", { length: 1500 }),
  brand: varchar("brand", { length: 1500 }),
  type: varchar("type", { length: 1500 }),
  desc: varchar("description", { length: 1500 }),
  stock: bigint("stock", { mode: "number" }),
  location: varchar("location", { length: 1500 }),
});
