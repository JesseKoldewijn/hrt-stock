import { LinkButton } from "@/components/ui/Button";
import {
  getAvaialbleStockCountries,
  getCountriesWithStocks,
} from "@/server/handlers/getters";
import { capitalize } from "@/utils/typography";
import { getCountryByAlpha3 } from "country-locale-map";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

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
      <h2 className="text-xl font-medium">Country: {countryDetails?.name}</h2>
      <Suspense>
        <div className="flex w-full max-w-lg flex-wrap justify-center gap-2 px-2 pt-2 sm:mx-auto sm:flex-row sm:flex-wrap sm:justify-between">
          {countryStock?.stocks ? (
            countryStock.stocks?.flatMap((x) => (
              <div
                key={x.id}
                className="border-secundary-100 flex w-full flex-col gap-1 rounded-md border bg-tertiary-1-100 px-2 py-2 sm:w-auto md:w-auto "
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
                <div className="flex gap-1 pb-2">
                  <span className="font-medium">Loc:</span>
                  <span>{x.location ?? "Not set"}</span>
                </div>

                <LinkButton
                  href={`/countries/${country}/stock/${x.id}`}
                  variant="primary"
                  layout="textIcon"
                  size="sm"
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
      </Suspense>
    </div>
  );
};

export default CountryPage;
