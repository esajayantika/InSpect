import { useState } from "react";
import type { ItemData, ItemInput } from "../types";

const useItems = () => {
  const [dataItem, setDataItem] = useState<ItemData[]>([]);

  // Fungsi Tambah data dengan State
  const handleAdd = (newItem: ItemInput) => {
    setDataItem((prev) => {
      const newId = prev.length > 0 ? Math.max(...prev.map((i) => i.id)) + 1 : 1;
      return [...prev, { ...newItem, id: newId }];
    });
  };

  return {
    dataItem,
    handleAdd,
  };
};

export default useItems;
