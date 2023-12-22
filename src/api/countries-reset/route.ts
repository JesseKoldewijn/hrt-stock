import { type NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const GET = async (req: NextApiRequest) => {
  const fetchCountryData = await fetch("https://restcountries.com/v3.1/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public max-age=86400",
    },
  });

  if (!fetchCountryData.ok)
    return NextResponse.json({
      status: "error",
      message: "Countries reset failed",
    });

  return NextResponse.json({
    status: "success",
    message: "Countries reset",
  });
};
