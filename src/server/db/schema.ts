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
    countryId: bigint("country_id", { mode: "number" }),
    currencyId: bigint("currency_id", { mode: "number" }),
    languageId: bigint("language_id", { mode: "number" }),
    demonymId: bigint("demonym_id", { mode: "number" }),
    timezoneId: bigint("timezone_id", { mode: "number" }),
    continentId: bigint("continent_id", { mode: "number" }),
    flagId: bigint("flag_id", { mode: "number" }),
    officialName: varchar("official_name", { length: 256 }),
    commonName: varchar("common_name", { length: 256 }),
    nativeNameEngOfficial: varchar("native_name_eng_official", { length: 256 }),
    nativeNameEngCommon: varchar("native_name_eng_common", { length: 256 }),
    currencyName: varchar("currency_name", { length: 256 }),
    currencySymbol: varchar("currency_symbol", { length: 256 }),
    languageCode: varchar("language_code", { length: 256 }),
    languageName: varchar("language_name", { length: 256 }),
    femaleDemonym: varchar("female_demonym", { length: 256 }),
    maleDemonym: varchar("male_demonym", { length: 256 }),
    timezone: varchar("timezone", { length: 256 }),
    continent: varchar("continent", { length: 256 }),
    pngFlag: varchar("png_flag", { length: 256 }),
    svgFlag: varchar("svg_flag", { length: 256 }),
    pngCoatOfArms: varchar("png_coat_of_arms", { length: 256 }),
    svgCoatOfArms: varchar("svg_coat_of_arms", { length: 256 }),
    postalCodeFormat: varchar("postal_code_format", { length: 256 }),
    postalCodeRegex: varchar("postal_code_regex", { length: 256 }),
  },
  (c) => ({
    countryIndex: index("country_idx").on(c.id),
    countryForeignKey: index("country_fk").on(c.countryId),
    currencyForeignKey: index("currency_fk").on(c.currencyId),
    languageForeignKey: index("language_fk").on(c.languageId),
    demonymForeignKey: index("demonym_fk").on(c.demonymId),
    timezoneForeignKey: index("timezone_fk").on(c.timezoneId),
    continentForeignKey: index("continent_fk").on(c.continentId),
    flagForeignKey: index("flag_fk").on(c.flagId),
  }),
);

// Kind of a hack because there's no infer prop for mysql tables in Drizzle ORM
// But I still see the usage of Drizzle as a win since it doesn't use a large
// rust binary like Prisma does. And it's a lot more raw and flexible.
type RecursiveColumns<T> = {
  [K in keyof T]: T[K] extends object ? RecursiveColumns<T[K]> : T[K];
};

/**
 * This is the type of the `countries` table. It's a recursive type that
 * includes all the columns and their types.
 */
export type Countries = RecursiveColumns<(typeof countries)["$columns"]>;
