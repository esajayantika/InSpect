import { useState } from "react";
import "./App.css";

type ItemInput = {
  id: number;
  sku: string;
  name: string;
  soh: number;
  price: number;
  actualCount: number;
  stockControl: boolean;
  itemMovement: boolean;
};

type Report = {
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

const Items: ItemInput[] = [
  {
    id: 1,
    sku: "A0001",
    name: "Pringles",
    soh: 8,
    price: 13000,
    actualCount: 5,
    stockControl: true,
    itemMovement: false,
  },
];

function App() {
  const [soh, setSoh] = useState("");
  const [actualCount, setActualCount] = useState("");
  const [itemSku, setItemSku] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stockControl, setStockControl] = useState(false);
  const [itemMovement, setItemMovement] = useState(false);
  const [error, setError] = useState("");
  const [dataItem, setDataItem] = useState<ItemInput[]>(Items);

  // konvert nilai inputan
  const sohValue = Number(soh);
  const actualValue = Number(actualCount);
  const itemPrice = Number(price);
  const itemVariance = actualValue - sohValue;

  // Fungsi Tambah data dengan State
  const handleAdd = () => {
    if (!soh.trim() || !actualCount.trim()) return;

    setDataItem((prev) => {
      const newId = prev.length > 0 ? Math.max(...prev.map((i) => i.id)) + 1 : 1;
      return [...prev, { id: newId, sku: itemSku, name: name, soh: sohValue, price: itemPrice, actualCount: actualValue, stockControl, itemMovement }];
    });

    setItemSku("");
    setName("");
    setSoh("");
    setPrice("");
    setActualCount("");
    setStockControl(false);
    setItemMovement(false);
  };

  const [result, setResult] = useState<Report | null>(null);

  const handleVariance = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // pengecekan nama dan sku
    if (!name.trim() || !itemSku.trim()) {
      setError("SKU and Name are required !");
      return;
    }
    setError("");

    // pengecekan soh dan actual count
    if (soh.trim() === "" || actualCount.trim() === "") {
      return;
    }

    // penentuan selisih variance
    const isZeroStock = sohValue === 0 && actualValue === 0;
    const isSohHigher = sohValue > actualValue;
    const isSohLower = sohValue < actualValue;

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
      { condition: sohValue !== 0 && actualValue === 0, message: "Item not scanned!" },
      { condition: itemVariance !== 0 && itemPrice >= 30000, message: "High Value Variance!" },
      { condition: Math.abs(itemVariance) >= 5, message: "Abnormal Variance!" },
      { condition: itemVariance !== 0 && stockControl === true, message: "Item Stock Control!" },
      { condition: itemVariance !== 0 && itemMovement === true, message: "Item Slow & Dead Moving!" },
    ];

    const reason: string[] = rules.filter((rule) => rule.condition).map((rule) => rule.message);

    // console.log(reason);

    setResult({
      sku: itemSku,
      name: name,
      price: itemPrice,
      soh: sohValue,
      actualCount: actualValue,
      variance: itemVariance,
      status: message,
      reasons: reason,
      totalFlags: reason.length,
    });
  };

  return (
    <>
      <div className="container">
        <h1>InSpect</h1>
        <h3>Inventory Validation Layer for Stock Count Activity</h3>
        <form onSubmit={handleVariance}>
          <h4>Input Selected Item</h4>
          <div className="item-info">
            <label htmlFor="sku">Item SKU</label>
            <input
              type="text"
              id="sku"
              value={itemSku}
              onChange={(e) => {
                setItemSku(e.target.value);
              }}
            />{" "}
            {error && <span style={{ color: "red" }}>{error}</span>}
            <label htmlFor="item-name">Name</label>
            <input
              type="text"
              id="item-name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />{" "}
            {error && <span style={{ color: "red" }}>{error}</span>}
            <label htmlFor="item-price">Price</label>
            <input
              type="number"
              id="item-price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <div className="item-qty">
            <div className="qty-group">
              <label htmlFor="soh">SOH</label>
              <input type="number" id="soh" value={soh} onChange={(e) => setSoh(e.target.value)} />
            </div>
            <div className="qty-group">
              <label htmlFor="count">Actual Count</label>
              <input type="number" id="count" value={actualCount} onChange={(e) => setActualCount(e.target.value)} />
            </div>
          </div>
          <div className="check-group">
            <input type="checkbox" checked={stockControl} onChange={(e) => setStockControl(e.target.checked)} />
            <label>Dept 7, Wine & Stock Control</label>
          </div>
          <div className="check-group">
            <input type="checkbox" checked={itemMovement} onChange={(e) => setItemMovement(e.target.checked)} />
            <label>Item Slow & Dead Moving</label>
          </div>
          <button type="button" onClick={handleAdd}>
            Add Item
          </button>
          <button type="submit">Check Variance</button>
        </form>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "start", border: "1px" }}>
          {dataItem.map((data) => (
            <div key={data.id}>
              <span>ID: {data.id}</span> <br />
              <span>Sku: {data.sku}</span> <br />
              <span>Nama: {data.name}</span> <br />
              <span>Harga: {data.price}</span> <br />
              <span>SOH: {data.soh}</span> <br />
              <span>ActualCount: {data.actualCount}</span> <br />
              <span>Stock Control: {data.stockControl}</span> <br />
              <span>Item Movement: {data.itemMovement}</span>
            </div>
          ))}
        </div>

        {result && (
          <div className="var-result">
            <h4>Variance Report</h4>
            <div>
              <p>Item Sku : {result.sku}</p>
              <p>Name : {result.name}</p>
            </div>
            <div className="var-group">
              <p>Total Variance :</p>
              <span className="variance">{result.variance}</span>
            </div>
            <p>Conclusion : {result.status}</p>
            <div className="flag-card">
              <h5>Reason: </h5>
              <ul>
                {result.reasons.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
              <span>Total Flaged: {result.totalFlags}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
