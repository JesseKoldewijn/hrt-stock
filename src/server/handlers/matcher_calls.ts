import { eq } from "drizzle-orm";
import { db } from "../db";
import { countries, stocks } from "../db/schema";
import { collectionMatchByString } from "@/utils/matchers";

/**
 * The `matchCountry` function checks if a country exists in a database based on its name or code and
 * returns a success message with the country data if it exists, or a failure message if it does not
 * exist.
 * @param {string} countryNameOrCode - The parameter `countryNameOrCode` is a string that represents
 * either the name or the code of a country. It can be used to search for a country in a database.
 * @returns The function `matchCountry` returns an object with the following properties:
 */
export const matchCountry = async (countryNameOrCode: string) => {
  // check if country exists in db
  const doesCountryExist = await db
    .select()
    .from(countries)
    .where((c) => {
      const cname = eq(c.nameCommon, countryNameOrCode);
      const ccode2 = eq(c.cca2, countryNameOrCode);
      const ccode3 = eq(c.cca3, countryNameOrCode);

      return cname.append(ccode2).append(ccode3);
    });

  if (doesCountryExist && doesCountryExist.at(0) !== null) {
    // if country exists, return it
    return {
      success: true,
      msg: "Country exists",
      data: doesCountryExist.at(0)!,
    };
  } else {
    // else, return no data with message
    return {
      success: false,
      msg: "Country does not exist",
      data: null,
    };
  }
};

/**
 * The function `getCountryMatch` retrieves country and stock matches based on a given country name or
 * code and a match percentage.
 * @param {string} countryNameOrCode - A string representing the name or code of a country.
 * @param {number} matchPercentage - The `matchPercentage` parameter is a number that represents the
 * minimum percentage of match required for a string to be considered a match. It is used in the
 * `collectionMatchByString` function to determine the similarity between two strings.
 *
 * @warn this function can be fairly expensive to run,
 * as it goes through both the countries data and the stocks data
 */
export const getCountryMatch = async (
  countryNameOrCode: string,
  matchPercentage: number,
) => {
  const startTime = Date.now();
  const cd = await db.select().from(countries).execute();
  const sd = await db.select().from(stocks).execute();

  const matchStats = new Map();

  const countryMatches = await collectionMatchByString(
    cd,
    "nameCommon",
    countryNameOrCode,
    matchPercentage,
  );
  const stockMatches = await collectionMatchByString(
    sd,
    "country",
    countryNameOrCode,
    matchPercentage,
  );

  const ranFor = Date.now() - startTime;

  return {
    success: true,
    msg: "Country matches",
    callDuration: ranFor,
    matchStats,
    data: {
      country: countryMatches,
      stock: stockMatches,
    },
  };
};
