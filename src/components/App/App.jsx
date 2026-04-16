import './App.css';
import Header from '../Header/Header.jsx';
import { getWeatherData } from '../../utils/weatherAPI.js';
import { useEffect, useState } from 'react';
import { defaultClothingItems } from '../../utils/clothingItems.js';
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";


import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [selectedItem, setSelectedItem] = useState(null);

  const [activeModal, setActiveModal] = useState("");

  useEffect(() => {
    getWeatherData()
      .then((data) => setWeatherData(data))
      .catch(console.error);
  }, []);

 


   function handleOpenAddItemModal() {
    setActiveModal("add-item");
  }

  function handleCloseModal() {
    setActiveModal("");
  }

  function handleOpenItemModal(item) {
  setSelectedItem(item);
  setActiveModal("item-preview");
}

function handleAddItem(newItem) {
  setClothingItems([newItem, ...clothingItems]);
}

  return (
    <div className="page">
      <Header 
        location={weatherData?.name}
        onAddItem={handleOpenAddItemModal}
      />

      <Main
        weatherData={weatherData}
        clothingItems={clothingItems}
        onCardClick={handleOpenItemModal}
      />

     
      <AddItemModal
        isOpen={activeModal === "add-item"}
        onClose={handleCloseModal}
        onAddItem={handleAddItem}
      />

      <ItemModal
        isOpen={activeModal === "item-preview"}
        onClose={handleCloseModal}
        item={selectedItem}
      />
      <Footer />
    </div>
  );
}

export default App;