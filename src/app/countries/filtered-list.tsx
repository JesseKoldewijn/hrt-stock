"use client";

import { getCountryByAlpha3 } from "country-locale-map";
import { type ChangeEvent, useState } from "react";
import { LinkButton } from "@/components/ui/Button";
import { type Country } from "@/types/countries";
import { countrySearch } from "@/utils/countrySearch";
import { slugify } from "@/utils/slugify";

type FilteredCountryListProps = {
  countries: string[];
  allAvailableCountries: Country[];
};

const FilteredCountryList = ({
  countries,
  allAvailableCountries,
}: FilteredCountryListProps) => {
  const [filteredCountries, setFilteredCountries] =
    useState<string[]>(countries);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length === 0) {
      setFilteredCountries(countries);
      return;
    }

    const filtered = countrySearch(value, allAvailableCountries);

    if (filtered.length > 0) {
      const filteredAvailableCountries = filtered
        .filter((x) => countries.includes(x.cca3))
        .flatMap((x) => x.cca3);
      setFilteredCountries([...filteredAvailableCountries, "Unknown"]);
      return;
    }

    setFilteredCountries(countries);
  };

  const CountryListEntry = ({ country }: { country: string }) => {
    const countryDetails = getCountryByAlpha3(country);

    return (
      <LinkButton
        href={`/countries/${slugify(
          countryDetails?.alpha3 ? countryDetails.alpha3 : country,
        )}`}
        variant="secondary"
        className="w-full rounded-none text-center"
        data-cca3={countryDetails?.alpha3 ? countryDetails.alpha3 : country}
        size="sm"
      >
        {countryDetails?.name ? countryDetails.name : country}
      </LinkButton>
    );
  };

  return (
    <div className="flex w-full flex-col gap-8">
      <div>
        <div className="mx-auto flex w-full justify-between px-6 pb-4">
          <h2 className="text-lg font-medium">Countries</h2>
          <input
            type="search"
            placeholder="Search for country"
            onChange={handleFilterChange}
            className="w-full max-w-[80%] rounded-md border p-1 md:max-w-[160px]"
          />
        </div>
      </div>

      <div className="mx-auto flex max-h-[40vh] max-w-md flex-col flex-wrap items-center justify-stretch gap-2 overflow-y-auto px-4 md:flex-row">
        {filteredCountries.flatMap((x, i) => (
          <CountryListEntry key={`${x}-${i}`} country={x} />
        ))}
      </div>
    </div>
  );
};

export default FilteredCountryList;
