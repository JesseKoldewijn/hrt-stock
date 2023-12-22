import { Country } from "@/types/countries";

const recursiveAddCountries = async (countryData: Country[]) => {
  const country = countryData.pop();

  if (!country) return;

  const { name, capital, region, subregion, population, currencies, flag } =
    country;

  const countryExists = await db.country.findFirst({
    where: {
      name,
    },
  });

  if (!countryExists) {
    await db.country.create({
      data: {
        name,
        capital,
        region,
        subregion,
        population,
        currencies,
        flag,
      },
    });
  }

  await recursiveAddCountries(countryData);
};
