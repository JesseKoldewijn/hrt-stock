import { type Country } from "@/types/countries";

export const countrySearch = (search: string, countries: Country[]) => {
  const actualCountries = countries.filter((country) => {
    const isCountryNameMatch = country.name.common
      .toLowerCase()
      .includes(search.toLowerCase());

    const isCountryCodeMatch = country.cca3
      .toLowerCase()
      .includes(search.toLowerCase());

    const isTranslation =
      Object.entries(country.translations).filter(([_key, value]) => {
        const isCommonTranslationMatch = value.common
          .toLowerCase()
          .includes(search.toLowerCase());
        const isOfficialTranslationMatch = value.official
          .toLowerCase()
          .includes(search.toLowerCase());

        return isCommonTranslationMatch || isOfficialTranslationMatch;
      }).length > 0;

    return isCountryNameMatch || isCountryCodeMatch || isTranslation;
  });

  return actualCountries;
};
