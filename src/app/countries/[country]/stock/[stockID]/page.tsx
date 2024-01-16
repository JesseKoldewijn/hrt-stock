import { eq } from "drizzle-orm";
import React, { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { LinkButton } from "@/components/ui/Button";
import { db } from "@/server/db";
import { type SelectStockSanitized, stocks } from "@/server/db/schema";
import { type Country } from "@/types/countries";
import { cn } from "@/utils/cn";

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
  const stockMin = 9;

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
      <div className="mx-auto flex items-center justify-center py-6">
        <div className="m-auto flex w-full flex-col items-center gap-4 md:flex-row md:gap-6">
          <section
            className="relative flex w-full flex-col items-center gap-1 md:items-start"
            data-intent="stock-section"
          >
            <span>Brand: {stockTotal.stock.brand}</span>
            <span>Type: {stockTotal.stock.type}</span>
            <span>Description: {stockTotal.stock.description}</span>
            <span>Location: {stockTotal.stock.location}</span>

            <div className="mx-auto flex gap-2 pt-3">
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full p-2 font-medium text-tertiary-1-50",
                  stockTotal.stock.stock && stockTotal.stock.stock > 0
                    ? stockTotal.stock.stock > stockMin
                      ? "bg-system-success-600"
                      : "bg-system-warn-700 text-secondary-900"
                    : "bg-system-danger-600",
                )}
              >
                {stockTotal.stock.stock && stockTotal.stock.stock > stockMin
                  ? "9+"
                  : stockTotal.stock.stock}
              </span>
              <span className="font-medium">in stock</span>
            </div>
          </section>

          <section
            className="mx-auto flex w-full max-w-lg flex-col items-center justify-center gap-3"
            data-intent="country-section"
          >
            <div className="relative h-24 w-40">
              <Image
                src={stockTotal.country.flags.png}
                alt={`${stockTotal.country.name.common.trim()} flag`}
                sizes="100% 100%"
                priority
                fill
              />
            </div>
            <div className="mx-auto flex flex-col pt-3">
              <span
                id="official-country-name"
                className="flex w-full justify-center gap-1"
              >
                Country:
                <span>{stockTotal.country.name.common}</span>
              </span>
              <span
                id="country-region"
                className="flex w-full justify-center gap-1"
              >
                Region:
                <span>{stockTotal.country.region}</span>
              </span>
            </div>
          </section>
        </div>
      </div>
      <div className="mx-auto flex flex-row gap-8">
        <LinkButton
          href={`/countries/${stockTotal.country.cca3.toLowerCase()}/stock`}
          variant="tertiary"
          size="default"
          layout="iconText"
          useArrow
        >
          <span className="font-medium">Go Back</span>
        </LinkButton>

        <LinkButton
          href={`/countries/${stockTotal.country.cca3.toLowerCase()}/stock/${stockTotal.stock.id}/edit`}
          variant="primary"
          size="default"
          layout="textIcon"
          useArrow
        >
          <span className="font-medium">Edit</span>
        </LinkButton>
      </div>
    </Suspense>
  );
};

export default CountryStockPage;
