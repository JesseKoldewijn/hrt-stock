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

export const stocks = mysqlTable("stocks", {
  id: bigint("id", { mode: "bigint" }).autoincrement().primaryKey(),
  country: varchar("country", { length: 1500 }),
  brand: varchar("brand", { length: 1500 }),
  type: varchar("type", { length: 1500 }),
  description: varchar("description", { length: 1500 }),
  stock: bigint("stock", { mode: "number" }),
  location: varchar("location", { length: 1500 }),
});

// types infered from the schema
type StockSchema = Omit<typeof stocks._.model.select, "id">;
interface StockSchemaSanitized extends StockSchema {
  id: number;
}
export type SelectStock = StockSchemaSanitized;
