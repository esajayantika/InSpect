import { useState } from "react";
import type { ItemInput } from "../types";
import "./ItemForm.css";

type ItemFormProps = {
  onAdd: (newItem: ItemInput) => void;
};

const ItemForm = ({ onAdd }: ItemFormProps) => {
  const [soh, setSoh] = useState("");
  const [actualCount, setActualCount] = useState("");
  const [itemSku, setItemSku] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stockControl, setStockControl] = useState(false);
  const [itemMovement, setItemMovement] = useState(false);
  const [error, setError] = useState("");

  // konvert nilai inputan
  const sohValue = Number(soh);
  const actualValue = Number(actualCount);
  const itemPrice = Number(price);

  const handleAddItem = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!soh.trim() || !actualCount.trim()) return;

    // pengecekan nama dan sku
    if (!name.trim() || !itemSku.trim()) {
      setError("SKU and Name are required !");
      return;
    }

    // pengecekan soh dan actual count
    if (soh.trim() === "" || actualCount.trim() === "") {
      return;
    }

    setError("");

    const newItem = {
      sku: itemSku,
      name: name,
      soh: sohValue,
      price: itemPrice,
      actualCount: actualValue,
      stockControl,
      itemMovement,
    };

    // masukin data yang siap ke props onadd
    onAdd(newItem);

    alert("Success add Data");

    setItemSku("");
    setName("");
    setSoh("");
    setPrice("");
    setActualCount("");
    setStockControl(false);
    setItemMovement(false);
  };

  return (
    <form onSubmit={handleAddItem}>
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
      <button type="submit">Add Data</button>
    </form>
  );
};

export default ItemForm;
