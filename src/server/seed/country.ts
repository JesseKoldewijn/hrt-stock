import { type Country } from "@/types/countries";
import { drizzle } from "drizzle-orm/mysql2";

import dotEnv from "dotenv";
import { createConnection } from "mysql2/promise";
import { countries } from "../db/schema.ts";

dotEnv.config();

const importCountryData = async () => {
  const connection = await createConnection({
    uri: process.env.DATABASE_URL,
    database: "hrt-countries",
  });

  const db = drizzle(connection);
  const cd = await fetch("https://restcountries.com/v3.1/all");

  if (!cd.ok) {
    console.error("Error fetching country data");
    return;
  }

  const countryData = (await cd.json()) as Country[];
  const dbCountries = await db.select().from(countries).execute();

  const cleanedCountries = countryData.map((c) => {
    return {
      id: dbCountries.find((dbC) => dbC.cca3 === c.cca3)?.id,
      nameCommon: c.name.common,
      nameOfficial: c.name.official,
      nameNative: c.name.nativeName ? JSON.stringify(c.name.nativeName) : null,
      cca2: c.cca2,
      cca3: c.cca3,
      currencies: c.currencies ? JSON.stringify(c.currencies) : null,
      timeZones: c.timezones.toString(),
      flags: c.flags ? JSON.stringify(c.flags) : null,
    };
  });

  try {
    console.log("Start importing country data");
    // Wiping old data
    if (
      cleanedCountries.length > 0 &&
      cleanedCountries.filter((c) => c.id).length > 0
    ) {
      await db.delete(countries).execute();
    }
    // Inserting new data
    await db.insert(countries).values(cleanedCountries).execute();
    console.log("Finished importing country data");
  } catch (e) {
    console.error(e);
  }
};
importCountryData()
  .then(() => console.log("Process finished"))
  .catch((e) => console.error(e));
