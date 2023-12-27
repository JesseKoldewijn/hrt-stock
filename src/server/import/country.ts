import { type Country } from "@/types/countries";
import { countries } from "../db/schema";
import { createConnection } from "mysql2/promise";
import { env } from "@/env";
import { drizzle } from "drizzle-orm/mysql2";

const importCountryData = async () => {
  const connection = await createConnection({
    uri: env.DATABASE_URL,
    port: 3306,
    ssl: "false",
  });
  const db = drizzle(connection);

  const cd = await fetch("https://restcountries.eu/rest/v3/all");

  if (!cd.ok) {
    console.error("Error fetching country data");
    return;
  }

  const countryData = (await cd.json()) as Country[];
  const cleanedCountries = countryData.map((c) => {
    return {
      nameCommon: c.name.common,
      nameOfficial: c.name.official,
      nameNative: Object.values(c.name.nativeName).join(", "),
      cca2: c.cca2,
      cca3: c.cca3,
      currencies: Object.values(c.currencies).join(", "),
      timeZones: c.timezones.toString(),
      flags: Object.values(c.flags).join(", "),
    };
  });

  try {
    await db.insert(countries).values(cleanedCountries).execute();
    console.log("Successfully imported country data");
  } catch (e) {
    console.error(e);
  }
};
importCountryData().catch((e) => console.error(e));
