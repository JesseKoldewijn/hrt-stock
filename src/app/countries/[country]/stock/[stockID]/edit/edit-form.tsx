"use client";

import React, { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { type SelectStockSanitized } from "@/server/db/schema";
import { type Country } from "@/types/countries";

type EditStockFormProps = {
  initialValue: SelectStockSanitized;
  countryDetails: Country;
  allCountryNamesAndCodes: Country[];
};

const EditStockForm = ({ initialValue }: EditStockFormProps) => {
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
    <div className="w-full">
      <form
        onSubmit={handleSumbit}
        onChange={(e) => handleAnyFormValueChangeOrKeyup(e)}
        className="mx-auto flex w-full max-w-lg flex-col gap-2 px-6 md:px-0"
      >
        <div className="flex items-center justify-stretch gap-3">
          <label htmlFor="brand" className="w-full max-w-20 text-ellipsis">
            Brand
          </label>
          <input
            id="brand"
            name="stock-brand"
            type="text"
            defaultValue=""
            className="w-full rounded-md border p-1"
          />
        </div>
        <div className="flex items-center justify-stretch gap-3">
          <label htmlFor="type" className="w-full max-w-20 text-ellipsis">
            Type
          </label>
          <input
            id="type"
            name="stock-type"
            type="text"
            defaultValue=""
            className="w-full rounded-md border p-1"
          />
        </div>
        <Button type="submit" className="mt-4 md:ml-auto md:max-w-20">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default EditStockForm;
