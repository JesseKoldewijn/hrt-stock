/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import stringCompare from "string-comparison";

/**
 * The function `collectionMatchByString` filters a collection of objects based on a match key and a
 * match string, using various string comparison algorithms, and returns the matching objects along
 * with match statistics.
 * @param {any[]} collection - An array of objects representing a collection of data. Each object in
 * the array should have properties that can be matched against the provided matchKey(s).
 * @param {string | string[]} matchKey - The `matchKey` parameter is the key or keys in the collection
 * objects that you want to match against the `matchString`. It can be a single string or an array of
 * strings.
 * @param {string} matchString - The `matchString` parameter is a string that you want to match against
 * the values in the `collection`. It is the string that you want to find matches for.
 * @param {number} matchPercentage - The `matchPercentage` parameter is a number that represents the
 * minimum average match percentage required for a match to be considered successful. It is used to
 * filter the collection and only return items that have an average match percentage greater than or
 * equal to the specified value.
 * @returns an object with the following properties:
 */
export const collectionMatchByString = async (
  collection: any[],
  matchKey: string | string[],
  matchString: string,
  matchPercentage: number,
) => {
  const matchStats = new Map();

  const matchKeys = Array.isArray(matchKey) ? matchKey : [matchKey];

  const stockMatches = collection.filter((s) => {
    matchKeys.forEach((key) => {
      const countryName = s[key]! as string;

      const cosMatch = stringCompare.cosine.similarity(
        countryName.toLowerCase(),
        matchString.toLowerCase(),
      );

      const levMatch = stringCompare.levenshtein.similarity(
        countryName.toLowerCase(),
        matchString.toLowerCase(),
      );

      const jwMatch = stringCompare.jaroWinkler.similarity(
        countryName.toLowerCase(),
        matchString.toLowerCase(),
      );

      const avgMatch = (cosMatch + levMatch + jwMatch) / 3;

      if (avgMatch >= matchPercentage) {
        matchStats.set(countryName, {
          cosMatch,
          levMatch,
          jwMatch,
          avgMatch,
        });
        return true;
      }
    });
  });

  return {
    success: true,
    msg: "Country matches",
    matchStats,
    data: stockMatches,
  };
};
