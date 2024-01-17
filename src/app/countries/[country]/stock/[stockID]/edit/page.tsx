import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/server/db";
import { stocks } from "@/server/db/schema";
import { getCountryByString } from "@/server/handlers/getters";
import { type Country } from "@/types/countries";
import EditStockForm from "./edit-form";

export const revalidate = 86400; // 24 hours

type CountryStockEditPageProps = {
  params: {
    country: string;
    stockID: string;
  };
};

const CountryStockEditPage = async ({
  params: { stockID, country },
}: CountryStockEditPageProps) => {
  const stock = await db
    .select()
    .from(stocks)
    .where(eq(stocks.id, BigInt(stockID)));

  if (!stock || stock.length === 0) {
    notFound();
  }

  const sanitizedStock = [stock.at(0)!]
    .flatMap((s) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _, ...rest } = s;
      return {
        id: parseInt(s.id.toString()),
        ...rest,
      };
    })
    .at(0)!;

  const [CountryCode] = await getCountryByString(country, [sanitizedStock]);

  const countryDetails = await fetch(
    `https://restcountries.com/v3.1/alpha/${CountryCode.toLowerCase()}?fields=name,translations,cca3,flags`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  ).then(async (x) => (await x.json()) as Country);

  const allCountryNamesAndCodes = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,translations,cca3,flags",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  ).then(async (x) => (await x.json()) as Country[]);

  return (
    <div>
      <EditStockForm
        initialValue={sanitizedStock}
        countryDetails={countryDetails}
        allCountryNamesAndCodes={allCountryNamesAndCodes}
      />
    </div>
  );
};

export default CountryStockEditPage;
