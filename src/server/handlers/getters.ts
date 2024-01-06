import { stocks, type SelectStockSanitized } from "@/server/db/schema";
import { db } from "@/server/db";
import { type Country } from "@/types/countries";

export const getStocks = async () => {
  const stocksArray = (await db.select().from(stocks)).flatMap((x) => {
    const { id, ...rest } = x;
    return {
      id: Number(id),
      ...rest,
    };
  }) as never as SelectStockSanitized[];

  if (!stocksArray) {
    throw new Error("No stock found");
  }

  return stocksArray.reduce(
    (acc: Record<string, SelectStockSanitized[]>, stock) => {
      const country = stock.country ?? "Other";
      const countryData = acc[country] ?? [];
      return {
        ...acc,
        [country]: [...countryData, stock],
      };
    },
    {},
  );
};

export const getCountryByString = async (countries: string[]) => {
  const countryResInit = await fetch(
    `https://restcountries.com/v3.1/all?fields=name,cca2,cca3,capital,translations`,
  );
  const countryDataInit = (await countryResInit.json()) as Country[];

  return countryDataInit;
};
