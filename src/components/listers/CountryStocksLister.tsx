import { type SelectStockSanitized, stocks } from "@/server/db/schema";
import { getCountryByString, getStocks } from "@/server/handlers/getters";
import { TypeOf } from "zod";

const StockListItemLine = ({
  title,
  children,
}: {
  title: keyof SelectStockSanitized;
  children: React.ReactNode;
}) => (
  <span className="flex gap-1">
    <strong>Brand:</strong>
    {children}
  </span>
);

export const CountryStocksLister = async () => {
  const stock = await getStocks();
  const stockKeys = Object.keys(stock);
  //   const countryByStringMatch = await getCountryByString(stockKeys);

  return (
    <div className="mx-auto w-full max-w-md">
      {stockKeys.map((country) => (
        // section with clickable drawers using summary/details

        <div
          key={country}
          className="mx-2 flex w-full max-w-lg flex-col items-center justify-center"
        >
          {country}
          <div className="flex max-w-md flex-row flex-wrap gap-1">
            {stock[country]
              ? stock[country]!.flatMap((s) => (
                  <div
                    key={`${s.id}-stockItem-${s.brand}`}
                    className="flex w-auto max-w-full flex-row items-center justify-between gap-4 rounded-lg border px-3 py-2"
                  >
                    <div className="flex flex-col">
                      <StockListItemLine title="brand">
                        {s.brand}
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
