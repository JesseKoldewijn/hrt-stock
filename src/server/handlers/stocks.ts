import { eq } from "drizzle-orm";
import { db } from "../db";
import { countries } from "../db/schema";

export const matchStockCountry = async (countryNameOrCode: string) => {
  const doesCountryExist = await db
    .select()
    .from(countries)
    .where((c) => {
      const cname = eq(c.nameCommon, countryNameOrCode);
      const ccode2 = eq(c.cca2, countryNameOrCode);
      const ccode3 = eq(c.cca3, countryNameOrCode);

      return cname.append(ccode2).append(ccode3);
    });

  if (doesCountryExist && doesCountryExist.at(0) !== null) {
    return {
      success: true,
      msg: "Country exists",
      data: doesCountryExist.at(0)!,
    };
  } else {
    return {
      success: false,
      msg: "Country does not exist",
      data: null,
    };
  }
};
