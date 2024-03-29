import { kv } from "@vercel/kv";
import axios from "axios";
import { getAlpha3ByAlpha2, getCountryByName } from "country-locale-map";
import { db } from "@/server/db";
import { stocks, type SelectStockSanitized } from "@/server/db/schema";
import { type Country } from "@/types/countries";
import { locale_mapping_common_mismatches } from "../locale.mapping";

export const getStocks = async () => {
  const stocksArray = (await db.select().from(stocks)).flatMap((x) => {
    const { id, ...rest } = x;
    return {
      id: Number(id),
      ...rest,
    };
  }) as never as SelectStockSanitized[];

  if (!stocksArray) {
    throw new Error("No stock found");
  }

  return stocksArray.reduce(
    (acc: Record<string, SelectStockSanitized[]>, stock) => {
      const country = stock.country ?? "Other";
      const countryData = acc[country] ?? [];
      return {
        ...acc,
        [country]: [...countryData, stock],
      };
    },
    {},
  );
};

export const getCountriesWithStocks = async (specificCountry?: string) => {
  const stocks = await getStocks();
  const countries = Object.keys(stocks);

  const countryStock = new Map<string, SelectStockSanitized[]>();

  for (const country of countries) {
    const cty = specificCountry ?? country;

    const stockforCountry = stocks[cty]!;
    const countryMatchFirstRun = await getCountryByString(cty, stockforCountry);

    if (countryMatchFirstRun) {
      const [countryName, stocks] = countryMatchFirstRun;
      if (countryStock.has(countryName)) {
        const stocksForCountry = countryStock.get(countryName)!;
        countryStock.set(countryName, [...stocksForCountry, ...stocks]);
      } else {
        countryStock.set(countryName, stocks);
      }
    }
    if (specificCountry && countryStock.size > 0) {
      break;
    }
  }

  const data = countryStock.entries();
  const dataArray = Array.from(data);

  return dataArray.map(([country, stocks]) => ({
    country,
    stocks,
  }));
};

export const getAvaialbleStockCountries = async () => {
  const stocksCountries = await db
    .select({
      country: stocks.country,
    })
    .from(stocks)
    .execute();

  const countries = new Set<string>();

  for (const country of stocksCountries) {
    if (country.country) {
      const cachedResult = (await kv.get(`${country.country}-country`)) as
        | string
        | undefined;

      if (cachedResult) {
        countries.add(cachedResult);
        continue;
      }
      const actualCountry = await getCountryByString(country.country, []);
      countries.add(actualCountry[0]);
      await kv.set(`${country.country}-country`, actualCountry[0]);
    }
  }

  return Array.from(countries);
};

export const getCountryByString = async (
  country: string,
  stockObj: SelectStockSanitized[],
) => {
  const urlPrefix = "https://restcountries.com/v3.1";

  const incorrectCountryNames = new Set<string>();

  const urlByCountryLength = {
    1: "/alpha/",
    2: "/alpha/",
    3: "/alpha/",
    default: "/translation/",
  } as const;

  const countryLength =
    country.length > 0 && country.length < 4
      ? (country.length as keyof typeof urlByCountryLength)
      : ("default" as keyof typeof urlByCountryLength);

  const urlSuffix = urlByCountryLength[countryLength];

  const countryNameFuzzy = getCountryByName(country, true);
  const countryName = countryNameFuzzy
    ? countryNameFuzzy.name
    : country.toUpperCase();

  const url = `${urlPrefix}${urlSuffix}${
    urlSuffix == "/alpha/"
      ? getAlpha3ByAlpha2(country.toUpperCase()) ??
        (locale_mapping_common_mismatches[
          country.toLowerCase() as keyof typeof locale_mapping_common_mismatches
        ] &&
          getAlpha3ByAlpha2(
            locale_mapping_common_mismatches[
              country as keyof typeof locale_mapping_common_mismatches
            ],
          )) ??
        country
      : countryName
  }`;

  const cachedCountry = await kv.get<Country[]>(url);

  if (cachedCountry) {
    const cd = cachedCountry.at(0)!;
    return [cd.cca3, stockObj] as const;
  }

  try {
    const countryDataFirst =
      country !== "unknown"
        ? await axios.get(url, {
            headers: {
              "Content-Type": "application/json",
            },
          })
        : { data: [] };
    const countryData = countryDataFirst.data as Country[];

    if (countryData.length > 0) {
      const cd = countryData.at(0)!;
      const cca3 = getAlpha3ByAlpha2(cd.cca2.toUpperCase());

      if (cca3) {
        return [cca3, stockObj] as const;
      } else {
        incorrectCountryNames.add(country);
      }
    } else {
      incorrectCountryNames.add(country);
    }

    if (incorrectCountryNames.size > 0) {
      const countryName = Array.from(incorrectCountryNames).at(0)!;
      const countryMatch = getCountryByName(countryName, true);

      if (countryMatch) {
        await kv.set(url, [countryMatch]);
        return [countryMatch.alpha3.toUpperCase(), stockObj] as const;
      } else {
        await kv.set(url, [{ cca3: "Unknown" }]);
        return ["Unknown", stockObj] as const;
      }
    } else {
      return [country, stockObj] as const;
    }
  } catch (e) {
    console.log(e);
    await kv.set(url, [{ cca3: "Unknown" }]);
    return ["Unknown", stockObj] as const;
  }
};
