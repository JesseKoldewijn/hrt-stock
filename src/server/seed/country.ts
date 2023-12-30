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

    // // Falling back to fetch post request to laravel backend
    // try {
    //   const req = await fetch("http://localhost:8000/api/countries/storeMany", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       countries: cleanedCountries,
    //     }),
    //   });

    //   const res = (await req.json()) as unknown;
    //   console.log("Finished importing country data", res);
    // } catch (e) {
    //   console.error(e);
    // }
  } catch (e) {
    console.error(e);
  }
};
importCountryData().catch((e) => console.error(e));
