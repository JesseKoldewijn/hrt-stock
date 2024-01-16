import { getCountryByAlpha3 } from "country-locale-map";
import { Suspense } from "react";
import Link from "next/link";
import { getAvaialbleStockCountries } from "@/server/handlers/getters";
import { slugify } from "@/utils/slugify";

export const revalidate = 86400; // 24 hours

const CountriesPage = async () => {
  const countries = await getAvaialbleStockCountries();

  const CountryListEntry = async ({ country }: { country: string }) => {
    const countryDetails = getCountryByAlpha3(country);

    return (
      <Link
        href={`/countries/${slugify(
          countryDetails?.alpha3 ? countryDetails.alpha3 : country,
        )}`}
        className="flex justify-center rounded-md border bg-tertiary-1 px-2 py-1 text-center font-medium"
      >
        {countryDetails?.name ? countryDetails.name : country}
      </Link>
    );
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <h2 className="text-lg font-medium">Countries</h2>
      <Suspense>
        <div className="flex flex-col flex-wrap gap-2 md:flex-row">
          {countries.flatMap((x, i) => (
            <CountryListEntry key={`${x}-${i}`} country={x} />
          ))}
        </div>
      </Suspense>
    </div>
  );
};

export default CountriesPage;
