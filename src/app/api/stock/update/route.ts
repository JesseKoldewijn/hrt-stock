import { NextResponse } from "next/server";
import { updateStock } from "@/server/actions/update-stock";
import { type SelectStockSanitized } from "@/server/db/schema";

export const POST = async (req: Request) => {
  const body = (await req.json()) as {
    id: number;
    stock: SelectStockSanitized;
  };
  const { id, stock } = body;

  const stockUpdateRes = await updateStock(id, stock);

  if (!stockUpdateRes) {
    return NextResponse.json(
      {
        error: "Stock not found",
        message: "Stock not found",
        success: false,
      },
      { status: 404 },
    );
  }

  if (!stockUpdateRes.success) {
    return NextResponse.json(
      {
        error: stockUpdateRes.error,
        message: stockUpdateRes.error,
        success: false,
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
