import { type Country } from "@/types/countries";

export const countrySearch = (search: string, countries: Country[]) => {
  const actualCountries = countries.filter((country) => {
    const isCountryNameMatch = country.name.common
      .toLowerCase()
      .includes(search.toLowerCase());
    const isCountryCodeMatch = country.cca3
      .toLowerCase()
      .includes(search.toLowerCase());

    return isCountryNameMatch || isCountryCodeMatch;
  });

  return actualCountries;
};
