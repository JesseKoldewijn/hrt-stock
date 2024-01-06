import { type SelectStockSanitized } from "@/server/db/schema";
import { getCountriesWithStocks } from "@/server/handlers/getters";
import { getCountryByAlpha3 } from "country-locale-map";

const StockListItemLine = ({
  title,
  children,
}: {
  title: keyof SelectStockSanitized;
  children: React.ReactNode;
}) => (
  <span className="flex gap-1">
    <strong>{title}:</strong>
    {children}
  </span>
);

export const CountryStocksLister = async () => {
  const countryWithStocks = await getCountriesWithStocks();

  const getCountryLabelByCCA3 = (country?: string) => {
    if (!country) return null;
    return getCountryByAlpha3(country)?.name ?? country;
  };

  return (
    <div className="mx-auto my-4 flex w-full max-w-md flex-wrap gap-4">
      {countryWithStocks.map((entry) => (
        <div
          key={entry.country}
          className="mx-2 flex w-full max-w-lg flex-col items-center justify-center"
        >
          {getCountryLabelByCCA3(entry.country)}
          <div className="flex max-w-md flex-row flex-wrap gap-1">
            {entry.stocks.length > 0
              ? entry.stocks.flatMap((s) => (
                  <div
                    key={`${s.id}-stockItem-${s.brand}`}
                    className="flex w-auto max-w-full flex-row items-center justify-between gap-4 rounded-lg border px-3 py-2"
                  >
                    <div className="flex flex-col">
                      <StockListItemLine title="brand">
                        {s.brand}
                      </StockListItemLine>
                      <StockListItemLine title="type">
                        {s.type}
                      </StockListItemLine>
                      <StockListItemLine title="description">
                        {s.description}
                      </StockListItemLine>
                    </div>
                  </div>
                ))
              : "No stock found"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountryStocksLister;
