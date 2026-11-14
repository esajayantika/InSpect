import type { ItemData } from "../types";

type ItemListProps = {
  listdata: ItemData[];
};

const ItemList = ({ listdata }: ItemListProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "start", border: "1px" }}>
      {listdata.map((data) => (
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
  );
};

export default ItemList;
