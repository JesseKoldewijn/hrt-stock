import { NextResponse } from "next/server";
import { type SelectStockSanitized } from "@/server/db/schema";
import { updateStock } from "@/server/handlers/update-stock";

export const POST = async (req: Request) => {
  const body = (await req.json()) as {
    id: number;
    stock: SelectStockSanitized;
  };
  const { stock } = body as { stock: SelectStockSanitized };

  if (!stock) {
    return NextResponse.json(
      {
        success: false,
        error: "No stock provided",
        message: "No stock provided",
      },
      { status: 400 },
    );
  }

  const stockUpdateRes = await updateStock(stock);

  if (!stockUpdateRes) {
    return NextResponse.json(
      {
        success: false,
        error: "Stock not found",
        message: "Stock not found",
      },
      { status: 404 },
    );
  }

  if (!stockUpdateRes.success) {
    return NextResponse.json(
      {
        success: false,
        error: stockUpdateRes.error,
        message: stockUpdateRes.error,
      },
      {
        status: 400,
      },
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Stock updated",
      data: stock,
    },
    {
      status: 200,
    },
  );
};
