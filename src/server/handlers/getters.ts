import { type SelectStock, stocks } from "@/server/db/schema";
import { db } from "@/server/db";
import { findCountry } from "./matchers";
import { type Country } from "@/types/countries";

export type StockWithCountry = {
  id: number;
  name: string;
  symbol: string;
  country: string;
  countryData: Country | null;
};

export const getStocksWithCountry = async () => {
  const stocksData = (await db.select().from(stocks)) as never as SelectStock[];

  const stockDataWithCountry = await Promise.all(
    stocksData.map(async (stock) => {
      const { id, ...rest } = stock;
      const country = stock.country ? await findCountry(stock.country) : null;

      return {
        // need to convert to int because of bigint not being supported by json stringify
        id: parseInt(id.toString()),
        ...rest,
        countryData: country,
      };
    }),
  );
  return stockDataWithCountry;
};
