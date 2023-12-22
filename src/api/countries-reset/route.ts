// import { type Country } from "@/types/countries";
import { NextResponse } from "next/server";

/**
 * @todo WIP feature
 */
export const GET = async () => {
  // const fetchCountryData = await fetch("https://restcountries.com/v3.1/all", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Cache-Control": "public max-age=86400",
  //   },
  // });

  // if (!fetchCountryData.ok)
  return NextResponse.json({
    status: "error",
    message: "Countries reset failed",
  });

  // const countryData = (await fetchCountryData.json()) as Country[];

  // return NextResponse.json({
  //   status: "success",
  //   message: "Countries reset",
  // });
};
