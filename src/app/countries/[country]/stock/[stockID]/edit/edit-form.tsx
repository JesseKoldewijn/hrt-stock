"use client";

import React, { useState, type FormEvent } from "react";
import Image from "next/image";
import { Button, LinkButton } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/Input";
import { type SelectStockSanitized } from "@/server/db/schema";
import { type Country } from "@/types/countries";
import { cn } from "@/utils/cn";
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
  const [msg, setMsg] = useState<{
    status: "success" | "error";
    message: string;
  }>();

  const [stock, setStock] = useState<SelectStockSanitized>(initialValue);
  const [country, setCountry] = useState<Country>(countryDetails);

  const handleAnyFormValueChangeOrKeyup = (e: FormEvent<HTMLFormElement>) => {
    setMsg(undefined);

    const ct = e.currentTarget;
    const inputValues = Array.from(ct.querySelectorAll("input"))
      .map((x) => ({
        [x.id]: x.value,
      }))
      .flat();

    // merge inputValues into a single object with the spread operator and typed as SelectStockSanitized
    const newStock = {
      id: stock.id,
      country: stock.country,
      ...inputValues.reduce((acc, cur) => ({ ...acc, ...cur }), {}),
    } as never as SelectStockSanitized;

    setStock(newStock);
  };

  const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submitRes = await fetch("/api/stock/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stock: stock }),
    });

    if (submitRes.ok) {
      const data = (await submitRes.json()) as {
        success: boolean;
        message: string;
        error?: string;
        data?: SelectStockSanitized;
      };

      if (data.success) {
        setMsg({
          status: "success",
          message: data.message,
        });
      } else {
        setMsg({
          status: "error",
          message: data.message,
        });
      }
    } else {
      setMsg({
        status: "error",
        message: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div className="flex w-full flex-col gap-4">
      {msg && (
        <div
          id="form-message"
          className={cn(
            msg.status === "success"
              ? "border-2 border-system-success-600 text-system-success-600"
              : "border-2 border-system-danger-700 text-system-danger-700",
            "mx-auto flex w-full items-center justify-center md:max-w-sm",
          )}
        >
          {msg.message}
        </div>
      )}

      <div className="flex items-center justify-center gap-4 pb-2">
        <div className="relative h-14 w-20">
          <Image
            src={country.flags.png}
            alt={country.name.common}
            sizes="100% 100%"
            priority
            fill
          />
        </div>
        <h3 className="text-xl font-medium">{country.name.common}</h3>
      </div>

      <div className="mx-auto flex w-full max-w-lg flex-col gap-2 px-6 md:px-0">
        <div className="flex items-center justify-stretch gap-3">
          <span className="w-full max-w-20 text-ellipsis">Country</span>
          <div>
            <CountrySelector
              availableCountries={allCountryNamesAndCodes}
              currentCountry={country}
              setCountry={setCountry}
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
            if (name === "id" || name === "country") return null;

            const isNumberInput = name === "stock";

            return (
              <div key={i} className="flex items-center justify-stretch gap-3">
                <label htmlFor={name} className="w-full max-w-20 text-ellipsis">
                  {name}
                </label>
                <TextInput
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
        <div className="flex w-full justify-between pt-4">
          <LinkButton
            href={`/countries/${countryDetails.cca3.toLocaleLowerCase()}/stock/${stock.id}`}
            variant="secondary"
            layout="iconText"
            size="sm"
            useArrow
          >
            Go Back
          </LinkButton>
          <Button type="submit" size="sm">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditStockForm;
