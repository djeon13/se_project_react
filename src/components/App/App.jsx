import "./App.css";
import Header from '../Header/Header.jsx';
import { getWeatherData } from '../../utils/weatherAPI.js';
import { useEffect, useState } from 'react';
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import { Routes, Route } from 'react-router-dom';
import Profile from "../Profile/Profile.jsx";
import { getItems, addItem, deleteItem } from "../../utils/api";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    getWeatherData()
      .then((data) => setWeatherData(data))
      .catch(console.error);
  }, []);

useEffect(() => {
  getItems()
    .then((data) => {
      setClothingItems(
        data.map((item) => ({
          ...item,
          link: item.imageUrl,
        }))
      );
    })
    .catch(console.error);
}, []);
 
function handleToggleSwitchChange() {
  setCurrentTemperatureUnit(prev =>
    prev === 'F' ? 'C' : 'F'
  );
}

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

function handleAddItem(newItem, resetForm) {
  addItem(newItem)
    .then((savedItem) => {
      setClothingItems((prev) => [
        {
          ...savedItem,
          link: savedItem.imageUrl, 
        },
        ...prev,
      ]);
      resetForm();
      handleCloseModal();
    })
    .catch(console.error);
}

function handleConfirmDelete() {
  deleteItem(itemToDelete._id)
    .then(() => {
      setClothingItems((prev) =>
        prev.filter(
          (item) => item._id !== itemToDelete._id
        )
      );

      setItemToDelete(null);
      handleCloseModal();
    })
    .catch(console.error);
}

function handleOpenDeleteModal(item) {
  setItemToDelete(item);
  setActiveModal("delete-confirmation");
}

  return (
  <div className="page">
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <Header 
        location={weatherData?.name}
        onAddItem={handleOpenAddItemModal}
      />

      <Routes>
  <Route
    path="/"
    element={
      <Main
        weatherData={weatherData}
        clothingItems={clothingItems}
        onCardClick={handleOpenItemModal}
      />
    }
  />

  <Route
    path="/profile"
    element={
      <Profile
        clothingItems={clothingItems}
        onCardClick={handleOpenItemModal}
        onAddItem={handleOpenAddItemModal}
      />
    }
  />
</Routes>

      <AddItemModal
        isOpen={activeModal === "add-item"}
        onClose={handleCloseModal}
        onAddItem={handleAddItem}
      />

     <ItemModal
  isOpen={activeModal === "item-preview"}
  onClose={handleCloseModal}
  item={selectedItem}
  onDelete={handleOpenDeleteModal}
/>

<DeleteConfirmationModal
  isOpen={activeModal === "delete-confirmation"}
  onClose={handleCloseModal}
  onConfirm={handleConfirmDelete}
/>

      <Footer />
    </CurrentTemperatureUnitContext.Provider>
  </div>
);
}

export default App;