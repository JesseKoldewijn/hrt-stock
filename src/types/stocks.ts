export type Stock = Record<string, StockItem[]>;

type StockItem = {
  brand: string;
  type: string;
  description: string;
  stock: number;
  location: string | null;
};
