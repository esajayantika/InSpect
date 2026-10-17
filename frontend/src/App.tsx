import { useState } from "react";
import "./App.css";

type Report = {
  name: string;
  sku: string;
  soh: number;
  actualCount: number;
  variance: number;
  status: string;
};

function App() {
  const [soh, setSoh] = useState("");
  const [actualCount, setActualCount] = useState("");
  const [itemSku, setItemSku] = useState("");
  const [name, setName] = useState("");

  const [result, setResult] = useState<Report | null>(null);

  const handleVariance = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (soh.trim() === "" || actualCount.trim() === "") {
      return;
    }
    const sohValue = Number(soh);
    const actualValue = Number(actualCount);

    let message;
    if (sohValue > actualValue) {
      message = "Actual count less than stock on hand. Further Investigation needed";
    } else if (sohValue < actualValue) {
      message = "Actual count more than stock on hand. Further Investigation needed";
    } else {
      message = "Stock matches actual count. Inventory is accurate";
    }

    setResult({
      sku: itemSku,
      name: name,
      soh: sohValue,
      actualCount: actualValue,
      variance: actualValue - sohValue,
      status: message,
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
              name="sku"
              value={itemSku}
              onChange={(e) => {
                setItemSku(e.target.value);
              }}
            />
            <label htmlFor="item name">Name</label>
            <input
              type="text"
              name="item-name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="item-qty">
            <div className="qty-group">
              <label htmlFor="soh">SOH</label>
              <input type="number" name="soh" value={soh} onChange={(e) => setSoh(e.target.value)} />
            </div>
            <div className="qty-group">
              <label htmlFor="count">Actual Count</label>
              <input type="number" name="count" value={actualCount} onChange={(e) => setActualCount(e.target.value)} />
            </div>
          </div>

          <button type="submit">Check Variance</button>
        </form>

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
          </div>
        )}
      </div>
    </>
  );
}

export default App;
