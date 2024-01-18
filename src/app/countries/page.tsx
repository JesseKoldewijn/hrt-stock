import { Suspense } from "react";
import { getAvaialbleStockCountries } from "@/server/handlers/getters";
import { type Country } from "@/types/countries";
import FilteredCountryList from "./filtered-list";

export const revalidate = 86400; // 24 hours
export const dynamic = "force-dynamic";

const CountriesPage = async () => {
  const countries = await getAvaialbleStockCountries();

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
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <Suspense>
        <FilteredCountryList
          countries={countries}
          allAvailableCountries={allCountryNamesAndCodes}
        />
      </Suspense>
    </div>
  );
};

export default CountriesPage;
