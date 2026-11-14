import "../Styles/HomePage.css";
import useItems from "../hooks/useItems";
import ItemForm from "../components/ItemForm";
import ItemList from "../components/ItemList";
import GenerateReport from "../components/GenerateReport";

const HomePage = () => {
  const { handleAdd, dataItem } = useItems();

  return (
    <div className="container">
      <h1>InSpect</h1>
      <h3>Inventory Validation Layer for Stock Count Activity</h3>
      <ItemForm onAdd={handleAdd} />
      <ItemList listdata={dataItem} />
      <GenerateReport listdata={dataItem} />
    </div>
  );
};

export default HomePage;
