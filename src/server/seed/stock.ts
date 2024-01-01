import { drizzle } from "drizzle-orm/mysql2";

import dotEnv from "dotenv";
import { createConnection } from "mysql2/promise";
import { stocks } from "../db/schema.ts";
import { type Stock } from "@/types/stocks.ts";
import { collectionMatchByString } from "@/utils/matchers.ts";

dotEnv.config();

const importCountryData = async () => {
  const connection = await createConnection({
    uri: process.env.DATABASE_URL,
    database: "hrt-countries",
  });

  const db = drizzle(connection);
  const sd = await fetch(
    "https://cms.mooore.nl/content/uploads/2022/12/stage-frontend1.json",
  );

  if (!sd.ok) {
    console.error("Error fetching country data");
    return;
  }

  const stockData = (await sd.json()) as Stock;
  const dbStock = await db.select().from(stocks).execute();

  const cleanedStock = Object.entries(stockData)
    .map(([country, value]) => {
      return value.flatMap((v) => {
        return {
          id: dbStock.find(
            (dbS) => dbS.country === country && dbS.brand === v.brand,
          )?.id,
          type: v.type,
          country: country,
          brand: v.brand,
          description: v.description,
          stock: v.stock,
          location: v.location,
        };
      });
    })
    .flat();

  try {
    console.log("Start importing country data");
    // Wiping old data
    if (
      cleanedStock.length > 0 &&
      cleanedStock.filter((c) => c.id).length > 0
    ) {
      await db.delete(stocks).execute();
    }
    // Inserting new data
    await db.insert(stocks).values(cleanedStock).execute();
    console.log("Finished importing stock data");
  } catch (e) {
    console.error(e);
  }
};
importCountryData()
  .then(() => console.log("Process finished"))
  .catch((e) => console.error(e));
