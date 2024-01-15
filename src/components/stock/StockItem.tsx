import { type SelectStockSanitized } from "@/server/db/schema";
import { type Country } from "@/types/countries";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { LinkButton } from "../ui/Button";

type StockItemProps = {
  stock: SelectStockSanitized;
  country: Country;
};

const StockItem = ({ stock, country }: StockItemProps) => {
  const stockMin = 9;

  return (
    <>
      <div className="flex items-center justify-center py-6">
        <div className="m-auto flex w-full flex-col items-center gap-4 md:flex-row md:gap-6">
          <section
            className="relative flex w-full flex-col items-center gap-1 md:items-start"
            data-intent="stock-section"
          >
            <span>Brand: {stock.brand}</span>
            <span>Type: {stock.type}</span>
            <span>Description: {stock.description}</span>
            <span>Location: {stock.location}</span>

            <div className="mx-auto flex gap-2 pt-3">
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full p-2 font-medium text-tertiary-1-50",
                  stock.stock && stock.stock > 0
                    ? stock.stock > stockMin
                      ? "bg-system-success-600"
                      : "bg-system-warn-700 text-secondary-900"
                    : "bg-system-danger-600",
                )}
              >
                {stock.stock && stock.stock > stockMin ? "9+" : stock.stock}
              </span>
              <span className="font-medium">in stock</span>
            </div>
          </section>

          <section
            className="mx-auto flex w-full max-w-lg flex-col items-center justify-center gap-3"
            data-intent="country-section"
          >
            <div className="relative h-24 w-40">
              <Image
                src={country.flags.png}
                alt={`${country.name.common.trim()} flag`}
                sizes="100% 100%"
                priority
                fill
              />
            </div>
            <div className="mx-auto flex flex-col pt-3">
              <span
                id="official-country-name"
                className="flex w-full justify-center gap-1"
              >
                Country:
                <span>{country.name.common}</span>
              </span>
              <span
                id="country-region"
                className="flex w-full justify-center gap-1"
              >
                Region:
                <span>{country.region}</span>
              </span>
            </div>
          </section>
        </div>
      </div>
      <div className="flex flex-row gap-8">
        <LinkButton
          href={`/countries/${country.cca3.toLowerCase()}/stock`}
          variant="tertiary"
          size="default"
          layout="iconText"
          useArrow
        >
          <span className="font-medium">Go Back</span>
        </LinkButton>

        <LinkButton
          href={`/countries/${country.cca3.toLowerCase()}/stock`}
          variant="primary"
          size="default"
          layout="textIcon"
          useArrow
        >
          <span className="font-medium">Edit</span>
        </LinkButton>
      </div>
    </>
  );
};

export default StockItem;
