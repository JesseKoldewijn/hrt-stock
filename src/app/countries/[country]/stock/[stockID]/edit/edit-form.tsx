"use client";

import React, { useState, type FormEvent, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { type SelectStockSanitized } from "@/server/db/schema";
import { type Country } from "@/types/countries";
import CountrySelector from "./_parts/countrySelector";

type EditStockFormProps = {
  initialValue: SelectStockSanitized;
  countryDetails: Country;
  allCountryNamesAndCodes: Country[];
};

const EditStockForm = ({
  initialValue,
  countryDetails,
  allCountryNamesAndCodes,
}: EditStockFormProps) => {
  const hiddenCountryInputRef = useRef<HTMLInputElement>(null);

  const [stock, setStock] = useState<SelectStockSanitized>(initialValue);

  const handleAnyFormValueChangeOrKeyup = (e: FormEvent<HTMLFormElement>) => {
    const ct = e.currentTarget;
    const inputValues = Array.from(ct.querySelectorAll("input"))
      .map((x) => ({
        [x.id]: x.value,
      }))
      .flat();

    // merge inputValues into a single object with the spread operator and typed as SelectStockSanitized
    const newStock = {
      ...inputValues.reduce((acc, cur) => ({ ...acc, ...cur }), {}),
    } as never as SelectStockSanitized;

    console.log(newStock);
  };

  const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit", e);
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div>
        <h2 className="text-center text-xl font-medium">Country</h2>
        <div className="flex items-center justify-center gap-4 py-4">
          <div className="relative h-14 w-20">
            <Image
              src={countryDetails.flags.png}
              alt={countryDetails.name.common}
              sizes="100% 100%"
              priority
              fill
            />
          </div>
          <h3 className="text-xl font-medium">{countryDetails.name.common}</h3>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-lg flex-col gap-2 px-6 md:px-0">
        <div className="flex items-center justify-stretch gap-3">
          <span className="w-full max-w-20 text-ellipsis">Country</span>
          <div>
            <input
              ref={hiddenCountryInputRef}
              type="hidden"
              id="stock-country"
              name="stock-country"
            />
            <CountrySelector
              availableCountries={allCountryNamesAndCodes}
              countryInputRef={hiddenCountryInputRef}
            />
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSumbit}
        onChange={(e) => handleAnyFormValueChangeOrKeyup(e)}
        className="mx-auto flex w-full max-w-lg flex-col gap-2 px-6 md:px-0"
      >
        {Object.entries(stock).flatMap(
          ([name, value]: [name: string, value: string | number], i) => {
            if (name === "id" ?? name === "country") return null;

            const isNumberInput = name === "stock";

            return (
              <div key={i} className="flex items-center justify-stretch gap-3">
                <label htmlFor={name} className="w-full max-w-20 text-ellipsis">
                  {name}
                </label>
                <input
                  id={name}
                  name={`stock-${name}`}
                  type={isNumberInput ? "number" : "text"}
                  onKeyDown={(e) => {
                    if (isNumberInput) {
                      if (e.key === "." || e.key === ",") {
                        e.preventDefault();
                      }
                    }
                  }}
                  onChange={(e) => {
                    if (isNumberInput) {
                      switch (e.currentTarget.value) {
                        case "":
                          e.currentTarget.value = "0";
                          break;
                        default:
                          e.currentTarget.value = Math.round(
                            parseInt(e.currentTarget.value, 10),
                          ).toString();
                          break;
                      }
                      if (e.currentTarget.value === "") {
                        e.currentTarget.value = "0";
                      }
                    }
                  }}
                  defaultValue={value}
                  className="w-full rounded-md border p-1"
                />
              </div>
            );
          },
        )}
        <Button type="submit" className="mt-4 md:ml-auto md:max-w-20">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default EditStockForm;
