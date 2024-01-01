import { db } from "@/server/db";
import { type SelectCountry, countries } from "@/server/db/schema";
import { type Country } from "@/types/countries";
import stringCompare from "string-comparison";

export const findCountry = async (matchString: string) => {
  const countryData = await db.select().from(countries);

  const matchedCountries = new Set();

  const findMatch = async (
    countryInput: SelectCountry,
    isRemoteData?: boolean,
  ) => {
    const c = countryInput as unknown as Country;
    const country = isRemoteData
      ? {
          nameCommon: c.name.common,
          nameOfficial: c.name.official,
          cca2: c.cca2,
          cca3: c.cca3,
        }
      : countryInput;

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

  countryData.map((c) => findMatch(c, false));

  const matchedCountryName = matchedCountries.values().next().value as string;
  const matchedCountryData = countryData.find(
    (country) => country.nameCommon === matchedCountryName,
  );
  const matchedCountryDataCleaned = () => {
    if (!matchedCountryData) return null;
    const { id, ...rest } = matchedCountryData;
    const newData = {} as Country;

    Object.keys(rest).forEach((key) => {
      const keyTyped = key as keyof typeof rest;
      const value = rest[keyTyped];

      const dataNeedsSplit = keyTyped === "timeZones";
      const dataNeedsParsing =
        keyTyped === "currencies" ||
        keyTyped === "flags" ||
        keyTyped === "nameNative";

      if (value && dataNeedsParsing) {
        // @ts-expect-error - no fix required
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        newData[keyTyped] = JSON.parse(value) as Country[typeof keyTyped];
      } else if (value && dataNeedsSplit) {
        // @ts-expect-error - no fix required
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        newData[keyTyped] = value.split(",") as Country[typeof keyTyped];
      } else {
        // @ts-expect-error - no fix required
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        newData[keyTyped] = value as Country[typeof keyTyped];
      }
    });

    return { id: parseInt(id.toString()), ...newData } as Country;
  };
  return matchedCountryDataCleaned() ?? null;
};
