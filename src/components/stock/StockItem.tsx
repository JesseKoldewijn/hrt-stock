"use client";

import { type SelectStockSanitized } from "@/server/db/schema";
import { type Country } from "@/types/countries";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";

type StockItemProps = {
  stock: SelectStockSanitized;
  country: Country;
};

const StockItem = ({ stock, country }: StockItemProps) => {
  const router = useRouter();
  const stockMin = 9;

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center">
      <div className="m-auto flex w-full flex-col items-center gap-4">
        <section
          className="relative flex flex-col items-center gap-1"
          data-intent="stock-section"
        >
          <div className="absolute -top-10 z-10 flex gap-2">
            <span
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full  p-2 font-medium text-tertiary-1-50",
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
          <span>Brand: {stock.brand}</span>
          <span>Type: {stock.type}</span>
          <span>Description: {stock.description}</span>
          <span>Location: {stock.location}</span>
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
          <div className="flex flex-col gap-1">
            <span
              id="official-country-name"
              className="flex w-full justify-center gap-1"
            >
              Country:
              <span>{country.name.official}</span>
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

        <Button
          variant="primary"
          size="lg"
          useArrow="left"
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
        >
          <span className="font-medium">Go Back</span>
        </Button>
      </div>
    </div>
  );
};

export default StockItem;
