import "./App.css";
import Header from "../Header/Header.jsx";
import { getWeatherData } from "../../utils/weatherAPI.js";
import { useEffect, useState } from "react";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile.jsx";
import {
  getItems,
  addItem,
  deleteItem,
  updateProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { register, authorize, checkToken } from "../../utils/auth";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    getWeatherData()
      .then((data) => setWeatherData(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log("Items from backend:", data);

        setClothingItems(
          data.map((item) => ({
            ...item,
            link: item.imageUrl,
          })),
        );
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      return;
    }

    checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(console.error);
  }, []);

  function handleToggleSwitchChange() {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  }

  function handleOpenAddItemModal() {
    setActiveModal("add-item");
  }

  function handleOpenRegisterModal() {
    setActiveModal("register");
  }

  function handleOpenLoginModal() {
    setActiveModal("login");
  }

  function handleCloseModal() {
    setActiveModal("");
  }

  function handleOpenItemModal(item) {
    setSelectedItem(item);
    setActiveModal("item-preview");
  }

  function handleOpenEditProfileModal() {
    setActiveModal("edit-profile");
  }

  function handleLogin(userData, resetForm) {
    authorize(userData)
      .then((res) => {
        localStorage.setItem("jwt", res.token);

        return checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);

        resetForm();
        handleCloseModal();
      })
      .catch(console.error);
  }

  function handleRegister(userData, resetForm) {
    register(userData)
      .then(() => {
        return authorize({
          email: userData.email,
          password: userData.password,
        });
      })
      .then((res) => {
        localStorage.setItem("jwt", res.token);

        return checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);

        resetForm();
        handleCloseModal();
      })
      .catch(console.error);
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");

    setCurrentUser({});
    setIsLoggedIn(false);
  }

  function handleUpdateUser(userData) {
  const token = localStorage.getItem("jwt");

  updateProfile(userData, token)
    .then((updatedUser) => {
      setCurrentUser((prevUser) => ({
        ...prevUser,
        ...updatedUser,
      }));

      handleCloseModal();
    })
    .catch(console.error);
  }

  function handleAddItem(newItem, resetForm) {
    const token = localStorage.getItem("jwt");

    addItem(newItem, token)
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
    const token = localStorage.getItem("jwt");
    deleteItem(itemToDelete._id, token)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== itemToDelete._id),
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

  function handleCardLike({ id, isLiked }) {
  const token = localStorage.getItem("jwt");

  const request = isLiked
    ? removeCardLike(id, token)
    : addCardLike(id, token);

  request
    .then((updatedItem) => {
      const normalizedItem = {
        ...updatedItem,
        link: updatedItem.imageUrl,
      };

      setClothingItems((items) =>
        items.map((item) =>
          item._id === id ? normalizedItem : item
        )
      );
    })
    .catch(console.error);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            location={weatherData?.name}
            onAddItem={handleOpenAddItemModal}
            onRegister={handleOpenRegisterModal}
            onLogin={handleOpenLoginModal}
            isLoggedIn={isLoggedIn}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  onCardClick={handleOpenItemModal}
                  onCardLike={handleCardLike}
                  isLoggedIn={isLoggedIn}
                />
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    clothingItems={clothingItems}
                    onCardClick={handleOpenItemModal}
                    onAddItem={handleOpenAddItemModal}
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                    onEditProfile={handleOpenEditProfileModal}
                    onSignOut={handleSignOut}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>

          <AddItemModal
            isOpen={activeModal === "add-item"}
            onClose={handleCloseModal}
            onAddItem={handleAddItem}
          />

          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={handleCloseModal}
            onRegister={handleRegister}
          />

          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={handleCloseModal}
            onUpdateUser={handleUpdateUser}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={handleCloseModal}
            onLogin={handleLogin}
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
    </CurrentUserContext.Provider>
  );
}

export default App;
