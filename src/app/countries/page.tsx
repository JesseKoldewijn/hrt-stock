import { getAvaialbleStockCountries } from "@/server/handlers/getters";
import { getCountryByAlpha3 } from "country-locale-map";
import Link from "next/link";

export const revalidate = 86400; // 24 hours

const CountriesPage = async () => {
  const countries = await getAvaialbleStockCountries();

  const CountryListEntry = async ({ country }: { country: string }) => {
    const countryDetails = getCountryByAlpha3(country);

    return (
      <Link
        href={`/countries/${
          // replace all whitespace with dashes
          countryDetails?.name
            ? countryDetails.name.toLowerCase().replaceAll(/\s+/g, "-")
            : country
        }`}
        className="flex rounded-md border bg-tertiary-1 px-2 py-1 font-medium"
      >
        {countryDetails?.name ? countryDetails.name : country}
      </Link>
    );
  };

  return (
    <div>
      <h1>Countries</h1>
      <div className="mx-auto flex max-w-md flex-row flex-wrap gap-2">
        {countries.flatMap((x) => (
          <CountryListEntry country={x} />
        ))}
      </div>
    </div>
  );
};

export default CountriesPage;
