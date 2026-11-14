import type { ItemData, Report } from "../types";
export const analizeVariance = (item: ItemData): Report => {
  // penentuan selisih variance
  const isZeroStock = item.soh === 0 && item.actualCount === 0;
  const isSohHigher = item.soh > item.actualCount;
  const isSohLower = item.soh < item.actualCount;
  const itemVariance = item.actualCount - item.soh;

  let message = "";
  if (isZeroStock) {
    message = "";
  } else {
    if (isSohHigher) {
      message = "Actual count less than stock on hand. Further Investigation needed!";
    } else if (isSohLower) {
      message = "Actual count more than stock on hand. Further Investigation needed!";
    } else {
      message = "Stock matches actual count. Inventory is accurate";
    }
  }
  // penentuan rules flag dan acuan dasar investigasi
  const rules = [
    { condition: item.soh !== 0 && item.actualCount === 0, message: "Item not scanned!" },
    { condition: itemVariance !== 0 && item.price >= 30000, message: "High Value Variance!" },
    { condition: Math.abs(itemVariance) >= 5, message: "Abnormal Variance!" },
    { condition: itemVariance !== 0 && item.stockControl === true, message: "Item Stock Control!" },
    { condition: itemVariance !== 0 && item.itemMovement === true, message: "Item Slow & Dead Moving!" },
  ];

  const reason: string[] = rules.filter((rule) => rule.condition).map((rule) => rule.message);

  return {
    sku: item.sku,
    name: item.name,
    price: item.price,
    soh: item.soh,
    actualCount: item.actualCount,
    variance: itemVariance,
    status: message,
    reasons: reason,
    totalFlags: reason.length,
  };
};
