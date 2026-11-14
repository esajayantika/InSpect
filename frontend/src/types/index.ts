// untuk type objek sebelum add data
export type ItemInput = {
  id?: number;
  sku: string;
  name: string;
  soh: number;
  price: number;
  actualCount: number;
  stockControl: boolean;
  itemMovement: boolean;
};

// untuk types setelah disimpan dalam koleksi data
export type ItemData = ItemInput & {
  id: number;
};

export type Report = {
  name: string;
  sku: string;
  soh: number;
  price: number;
  actualCount: number;
  variance: number;
  status: string;
  reasons: string[];
  totalFlags: number;
};
