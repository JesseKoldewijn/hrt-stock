import { LinkButton } from "@/components/ui/Button";
import {
  getAvaialbleStockCountries,
  getCountriesWithStocks,
} from "@/server/handlers/getters";
import { capitalize } from "@/utils/typography";
import { getCountryByAlpha3 } from "country-locale-map";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export const revalidate = 86400; // 24 hours

export type CountryPageProps = {
  params: {
    country: string;
  };
};

const CountryPage = async ({ params }: CountryPageProps) => {
  const { country } = params;

  const availableCountries = await getAvaialbleStockCountries();
  const availableCountriesSet = new Set(availableCountries);

  const countryDetails = getCountryByAlpha3(country.toUpperCase());
  const countryIsAvailable = countryDetails
    ? availableCountriesSet.has(countryDetails.alpha3.toUpperCase())
    : false;

  const countryStock = (await getCountriesWithStocks()).find(
    (x) =>
      x.country == countryDetails?.alpha3 ||
      x.country.toLowerCase() == country.toLowerCase(),
  );

  if (!countryIsAvailable && countryStock?.stocks == undefined)
    return notFound();

  return (
    <div className="flex flex-col items-center justify-center">
      <span>CountryPage: {countryDetails?.name}</span>
      <div className="flex w-full max-w-lg flex-col justify-center gap-2 px-2 pt-2 sm:mx-auto sm:flex-row sm:flex-wrap">
        {countryStock?.stocks ? (
          countryStock.stocks?.flatMap((x, i) => (
            <div
              key={x.id}
              className="border-secundary-100 flex w-full flex-col gap-1 rounded-md border bg-tertiary-1-100 px-2 py-1 sm:w-auto"
            >
              <div className="flex gap-1">
                <span className="font-medium">Brand:</span>
                <span>{x.brand}</span>
              </div>
              <div className="flex gap-1">
                <span className="font-medium">Type:</span>
                <span>{capitalize(x.type ?? "unknown")}</span>
              </div>
              <div className="flex gap-1">
                <span className="font-medium">Desc:</span>
                <span>{x.description}</span>
              </div>

              <LinkButton
                size="sm"
                href={`/countries/${country}/stock/${x.id}`}
                variant={
                  i == 0
                    ? "primary"
                    : i == 1
                      ? "secondary"
                      : i == 2
                        ? "tertiary"
                        : "destructive"
                }
                layout={i == 0 ? "iconText" : "textIcon"}
                useArrow
              >
                <span id="text" className="font-medium">
                  View Stock
                </span>
              </LinkButton>
            </div>
          ))
        ) : (
          <>No Stock Found</>
        )}
      </div>
    </div>
  );
};

export default CountryPage;
