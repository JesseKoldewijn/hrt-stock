import { type Country } from "@/types/countries";
import stringCompare from "string-comparison";

export const findCountry = async (matchString: string) => {
  const countryRes = await fetch("https://restcountries.com/v3.1/all");
  const countryData = (await countryRes.json()) as Country[];

  const matchedCountries = new Set();

  const findMatch = async (countryInput: Country) => {
    const c = countryInput as unknown as Country;
    const country = {
      nameCommon: c.name.common,
      nameOfficial: c.name.official,
      cca2: c.cca2,
      cca3: c.cca3,
    };

    const stringIsCommonName = country.nameCommon
      ? matchString !== "unknown" &&
        stringCompare.jaroWinkler.similarity(
          country.nameCommon.toLowerCase(),
          matchString.toLowerCase(),
        ) > 0.82
      : false;

    const stringIsNameOfficial = country.nameOfficial
      ? matchString !== "unknown" &&
        stringCompare.jaroWinkler.similarity(
          country.nameOfficial.toLowerCase(),
          matchString.toLowerCase(),
        ) > 0.82
      : false;

    const stringIsCCA2 = country.cca2
      ? matchString !== "unknown" &&
        stringCompare.jaroWinkler.similarity(
          country.cca2.toLowerCase(),
          matchString.toLowerCase(),
        ) > 0.82
      : false;

    const stringIsCCA3 = country.cca3
      ? matchString !== "unknown" &&
        stringCompare.jaroWinkler.similarity(
          country.cca3.toLowerCase(),
          matchString.toLowerCase(),
        ) > 0.82
      : false;

    if (
      stringIsCommonName ||
      stringIsNameOfficial ||
      stringIsCCA2 ||
      stringIsCCA3
    ) {
      matchedCountries.add(country.nameCommon);
      return;
    }
  };

  countryData.map((c) => findMatch(c));

  const matchedCountryName = matchedCountries.values().next().value as string;
  const matchedCountryData = countryData.find(
    (country) => country.name.common === matchedCountryName,
  );
  const matchedCountryDataCleaned = () => {
    if (!matchedCountryData) return null;
    const rest = matchedCountryData;
    const newData = {} as Country;

    Object.keys(rest).forEach((key) => {
      const keyTyped = key as keyof typeof rest;
      const value = rest[keyTyped];

      // @ts-expect-error - no fix required
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      newData[keyTyped] = value as Country[typeof keyTyped];
    });

    return { ...newData } as Country;
  };
  return matchedCountryDataCleaned() ?? null;
};
