import { type Country } from "@/types/countries";
import { countries } from "../db/schema.ts";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import dotEnv from "dotenv";

dotEnv.config({
  path: "../../../.env",
});

const importCountryData = async () => {
  const connection = new pg.Client({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(connection);
  const cd = await fetch("https://restcountries.com/v3.1/all");

  if (!cd.ok) {
    console.error("Error fetching country data");
    return;
  }

  const countryData = (await cd.json()) as Country[];
  const cleanedCountries = countryData.map((c) => {
    return {
      name_common: c.name.common,
      name_official: c.name.official,
      name_native: c.name.nativeName ? JSON.stringify(c.name.nativeName) : null,
      cca2: c.cca2,
      cca3: c.cca3,
      currencies: c.currencies ? JSON.stringify(c.currencies) : null,
      time_zones: c.timezones.toString(),
      flags: c.flags ? JSON.stringify(c.flags) : null,
    };
  });

  try {
    console.log("Start importing country data");
    // For some reason, query below silently fails
    await db.insert(countries).values(cleanedCountries).execute();
    console.log("Finished importing country data");
  } catch (e) {
    console.error(e);
  }
};
importCountryData().catch((e) => console.error(e));
