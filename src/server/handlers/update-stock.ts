import { eq } from "drizzle-orm";
import z from "zod";
import { stocks, type SelectStockSanitized } from "@/server/db/schema";
import { type Country } from "@/types/countries";
import { db } from "../db";
import { getCountryByString } from "../handlers/getters";

export const updateStock = async (stockObject: SelectStockSanitized) => {
  const {
    id,
    country,
    brand,
    type,
    description,
    stock: quantity,
    location,
  } = stockObject;

  const zodValidate = z.object({
    id: z.number(),
    country: z.string(),
    brand: z.string(),
    type: z.string(),
    description: z.string(),
    stock: z.number(),
    location: z.string(),
  });

  const qty = parseInt(String(quantity));

  if (isNaN(qty)) {
    return {
      error: "Stock must be a number",
      success: false,
    };
  }

  const stockData = await zodValidate.safeParseAsync({
    id,
    country,
    brand,
    type,
    description,
    stock: qty,
    location,
  });

  if (!stockData.success) {
    return {
      error: stockData.error,
      success: false,
    };
  }

  const [cca3] = await getCountryByString(stockData.data.country, [
    stockData.data,
  ] as SelectStockSanitized[]);

  if (!cca3) {
    return {
      error: "Country not found",
      success: false,
    };
  }

  const countryDataRes = await fetch(
    "https://restcountries.com/v3.1/alpha/" + cca3,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!countryDataRes.ok) {
    return {
      error: "Country not found or error in API",
      success: false,
    };
  }

  const countryData = (await countryDataRes.json()) as Country[];

  if (!countryData ?? countryData.length < 1) {
    return {
      error: "Country not found",
      success: false,
    };
  }

  const cd = countryData.at(0)!;

  const newCountryData = {
    country: cd.name.common.toLowerCase(),
    brand: stockData.data.brand,
    type: stockData.data.type,
    description: stockData.data.description,
    stock: stockData.data.stock,
    location: stockData.data.location,
  };

  try {
    // Update stock in DB via Drizzle ORM
    await db
      .update(stocks)
      .set(newCountryData)
      .where(eq(stocks.id, BigInt(stockData.data.id)))
      .execute();

    return {
      success: true,
      message: "Stock updated",
      data: stockData.data,
    };
  } catch (e) {
    const error = e as Error;
    return {
      error: error.message,
      success: false,
    };
  }
};
