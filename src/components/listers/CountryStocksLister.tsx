import { getCountriesWithStocks } from "@/server/handlers/getters";
import { getCountryByAlpha3 } from "country-locale-map";
import CountryStockListerItem from "./CountryStockListerItem";

export const CountryStocksLister = async () => {
  const countryWithStocks = await getCountriesWithStocks();

  return (
    <div className="mx-auto my-4 flex w-full max-w-md flex-wrap gap-4">
      {countryWithStocks.map((entry) => {
        const ctName = getCountryByAlpha3(entry.country)?.name ?? entry.country;

        return (
          <CountryStockListerItem
            key={entry.country}
            scEntry={entry}
            countryName={ctName}
          />
        );
      })}
    </div>
  );
};

export default CountryStocksLister;
