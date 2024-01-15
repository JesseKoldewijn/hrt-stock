import { getAvaialbleStockCountries } from "@/server/handlers/getters";
import { slugify } from "@/utils/slugify";
import { getCountryByAlpha3 } from "country-locale-map";
import Link from "next/link";

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
        className="flex rounded-md border bg-tertiary-1 px-2 py-1 font-medium"
      >
        {countryDetails?.name ? countryDetails.name : country}
      </Link>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h2 className="text-lg font-medium">Countries</h2>
      <div className="mx-auto flex max-w-lg flex-col flex-wrap gap-2 md:flex-row">
        {countries.flatMap((x, i) => (
          <CountryListEntry key={`${x}-${i}`} country={x} />
        ))}
      </div>
    </div>
  );
};

export default CountriesPage;
