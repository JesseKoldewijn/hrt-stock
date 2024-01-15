import StockItem from "@/components/stock/StockItem";
import { db } from "@/server/db";
import { type SelectStockSanitized, stocks } from "@/server/db/schema";
import { type Country } from "@/types/countries";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

export const revalidate = 86400; // 24 hours

type CountryStockPageProps = {
  params: {
    country: string;
    stockID: string;
  };
};

const CountryStockPage = async ({
  params: { country, stockID },
}: CountryStockPageProps) => {
  const stock = await db
    .select()
    .from(stocks)
    .where(eq(stocks.id, BigInt(stockID)));

  if (!stock || stock.length === 0) {
    notFound();
  }

  const parsedStock = [stock.at(0)!]
    .flatMap((s) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _, ...rest } = s;
      return {
        id: parseInt(s.id.toString()),
        ...rest,
      };
    })
    .at(0) as SelectStockSanitized;

  const ctRes = await fetch(
    `https://restcountries.com/v3.1/alpha/${country.toUpperCase()}`,
  );

  if (!ctRes.ok) {
    throw new Error(ctRes.statusText);
  }

  const ctData = (await ctRes.json()) as Country[];

  const stockTotal = {
    country: ctData.at(0)!,
    stock: parsedStock,
  };

  return (
    <Suspense>
      <StockItem stock={stockTotal.stock} country={stockTotal.country} />
    </Suspense>
  );
};

export default CountryStockPage;
