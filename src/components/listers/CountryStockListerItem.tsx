"use client";

import { type SelectStockSanitized } from "@/server/db/schema";

type CountryStockListerItemProps = {
  scEntry: {
    country: string;
    stocks: SelectStockSanitized[];
  };
  countryName: string;
};

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

const CountryStockListerItem = ({ scEntry }: CountryStockListerItemProps) => {
  return (
    <div className="mx-2 flex w-full max-w-lg flex-col items-center justify-center">
      <span className="mb-1 font-medium">{scEntry.country}</span>
      <div className="flex max-w-md flex-row flex-wrap gap-1">
        {scEntry.stocks.length > 0
          ? scEntry.stocks.flatMap((s) => (
              <div
                key={`${s.id}-stockItem-${s.brand}`}
                className="flex w-auto max-w-full flex-row items-center justify-between gap-4 rounded-lg border px-3 py-2"
              >
                <div className="flex flex-col">
                  <StockListItemLine title="brand">{s.brand}</StockListItemLine>
                  <StockListItemLine title="type">{s.type}</StockListItemLine>
                  <StockListItemLine title="description">
                    {s.description}
                  </StockListItemLine>
                  <StockListItemLine title="location">
                    {s.location ?? "Unknown"}
                  </StockListItemLine>
                </div>
              </div>
            ))
          : "No stock found"}
      </div>
    </div>
  );
};

export default CountryStockListerItem;
