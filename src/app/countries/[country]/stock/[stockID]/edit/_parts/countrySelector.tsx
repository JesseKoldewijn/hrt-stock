import { type FormEvent, type MouseEvent, useState } from "react";
import { FaArrowUp19 } from "react-icons/fa6";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { type Country } from "@/types/countries";
import { cn } from "@/utils/cn";
import { countrySearch } from "@/utils/countrySearch";

const CountrySelector = ({
  availableCountries,
  currentCountry,
  setCountry,
}: {
  availableCountries: Country[];
  currentCountry: Country;
  setCountry: React.Dispatch<React.SetStateAction<Country>>;
}) => {
  const [filteredCountries, setFilteredCountries] =
    useState<Country[]>(availableCountries);

  const handleSearchInput = (e: FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;

    const searchResult = countrySearch(input, availableCountries);
    setFilteredCountries(searchResult);
  };

  const handleCountryClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    country: Country,
  ) => {
    e.preventDefault();
    setCountry(country);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>
          <span className="flex w-full items-center justify-center gap-2 rounded-none px-1 py-2">
            Change Country <FaArrowUp19 />
          </span>
        </Button>
      </DrawerTrigger>
      <DrawerContent
        onClickCapture={(e) => {
          const eventTarget = e.target as HTMLElement;

          if (eventTarget.id === "country-search") {
            const inputElem = document.getElementById(
              "country-search",
            ) as HTMLInputElement;
            inputElem.focus();
            e.preventDefault();
          }
        }}
      >
        <DrawerHeader>
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle>Pick a country</DrawerTitle>
              <DrawerDescription>
                Make sure to pick the right one.
              </DrawerDescription>
            </div>
            <div className="mx-4 my-6 flex flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-1">
                <input
                  id="country-search"
                  name="country-search"
                  type="search"
                  className="w-full max-w-xs rounded-md border p-1"
                  placeholder="Search for a country"
                  onChange={handleSearchInput}
                  onClick={(e) => e.preventDefault()}
                />
              </div>
            </div>
          </div>
        </DrawerHeader>

        <div
          id="country-display"
          className="mx-4 flex max-h-[60vh] max-w-md flex-row flex-wrap justify-stretch gap-1 overflow-y-auto md:mx-2 md:max-h-60 md:max-w-full"
        >
          {(filteredCountries ?? availableCountries).map((country) => {
            const isSelected = currentCountry.cca3 == country.cca3;
            return (
              <Button
                key={country.cca3}
                className={cn(
                  isSelected && "border-system-success-600",
                  "flex w-full max-w-full items-center justify-center gap-2 rounded-none p-2 md:max-w-[180px]",
                )}
                variant="secondary"
                layout="iconText"
                onClick={(e) => {
                  handleCountryClick(e, country);
                }}
                icon={
                  <Image
                    src={country.flags.png}
                    alt={country.name.common}
                    height={20}
                    width={24}
                  />
                }
              >
                <span className="w-full max-w-[140px] overflow-hidden text-ellipsis">
                  {country.name.common}
                </span>
              </Button>
            );
          })}
        </div>

        <DrawerFooter className="flex flex-row justify-evenly">
          <DrawerClose asChild className="w-full max-w-xs">
            <Button variant="secondary">Cancel</Button>
          </DrawerClose>
          <Button variant="primary" className="w-full max-w-xs">
            Submit
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CountrySelector;
