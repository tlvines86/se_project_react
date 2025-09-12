import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { coordinates, APIkey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  getItems,
  addItem as apiAddItem,
  deleteCard as apiDeleteCard,
  updateUserProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { register, login, checkToken } from "../../utils/auth";

import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import AuthModalsWrapper from "../AuthModalsWrapper/AuthModalsWrapper";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureContext";
import CurrentUserContext, {
  CurrentUserProvider,
} from "../../contexts/CurrentUserContext";

function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) return <Navigate to="/" replace />;
  return children;
}

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: true,
  });

  const [clothingItems, setClothingItems] = useState([]);

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(true);

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const handleToggleSwitchChange = () =>
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleAddBtnClick = () => setActiveModal("add-garment");
  const closeActiveModal = () => setActiveModal("");
  const openRegister = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  };
  const openLogin = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };
  const closeRegister = () => setIsRegisterOpen(false);
  const closeLogin = () => setIsLoginOpen(false);

  const handleCardLike = (card, currentUser) => {
    if (!currentUser) return;

    const isLiked = card.likes?.includes(currentUser._id);

    const updatedItems = clothingItems.map((i) => {
      if (i._id === card._id) {
        const updatedLikes = isLiked
          ? i.likes.filter((id) => id !== currentUser._id)
          : [...(i.likes || []), currentUser._id];
        return { ...i, likes: updatedLikes };
      }
      return i;
    });

    setClothingItems(updatedItems);

    const token = localStorage.getItem("jwt");
    if (!isLiked) addCardLike(card._id, token).catch(console.error);
    else removeCardLike(card._id, token).catch(console.error);
  };

  const handleAddItemModalSubmit = async ({ name, imageUrl, weather }) => {
    try {
      const token = localStorage.getItem("jwt");
      const newItemFromServer = await apiAddItem({
        name,
        imageUrl,
        weather,
        token,
      });
      const normalizedItem = {
        ...newItemFromServer,
        imageUrl: newItemFromServer.link,
      };
      setClothingItems((prev) => [normalizedItem, ...prev]);
      closeActiveModal();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleCardDelete = async (idToDelete) => {
    try {
      const token = localStorage.getItem("jwt");
      await apiDeleteCard(idToDelete, token);
      setClothingItems((prev) =>
        prev.filter((item) => item._id !== idToDelete)
      );
      closeActiveModal();
    } catch (error) {
      console.error("Failed to delete card:", error);
    }
  };

  const handleEditProfile = async (
    { name, avatar },
    currentUser,
    setCurrentUser
  ) => {
    try {
      const updatedUser = await updateUserProfile(name, avatar);
      setCurrentUser(updatedUser);
      setIsEditProfileOpen(false);
      closeActiveModal();
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error)
      .finally(() => setIsLoading(false));

    getItems().then(setClothingItems).catch(console.error);
  }, []);

  return (
    <CurrentUserProvider>
      <CurrentUserContext.Consumer>
        {({ currentUser, isLoggedIn, login, logout, setCurrentUser }) => (
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <div className="page">
              <div className="page__content">
                {isLoading ? (
                  <p>Loading weather data...</p>
                ) : (
                  <>
                    <Header
                      handleAddBtnClick={handleAddBtnClick}
                      weatherData={weatherData}
                      isLoggedIn={isLoggedIn}
                      onRegisterClick={openRegister}
                      onLoginClick={openLogin}
                    />

                    <Routes>
                      <Route
                        path="/"
                        element={
                          <Main
                            weatherData={weatherData}
                            handleCardClick={handleCardClick}
                            clothingItems={clothingItems}
                            onCardLike={(card) =>
                              handleCardLike(card, currentUser)
                            }
                          />
                        }
                      />
                      <Route
                        path="/profile"
                        element={
                          <ProtectedRoute isLoggedIn={isLoggedIn}>
                            <Profile
                              handleCardClick={handleCardClick}
                              clothingItems={clothingItems}
                              handleAddBtnClick={handleAddBtnClick}
                              onEditProfileClick={() =>
                                setIsEditProfileOpen(true)
                              }
                              setClothingItems={setClothingItems}
                              handleCardLike={(card) =>
                                handleCardLike(card, currentUser)
                              }
                              onEditProfile={(data) =>
                                handleEditProfile(
                                  data,
                                  currentUser,
                                  setCurrentUser
                                )
                              }
                            />
                          </ProtectedRoute>
                        }
                      />
                    </Routes>

                    <AddItemModal
                      isOpen={activeModal === "add-garment"}
                      handleCloseBtnClick={closeActiveModal}
                      onAddItemModalSubmit={handleAddItemModalSubmit}
                    />

                    <ItemModal
                      activeModal={activeModal}
                      card={selectedCard}
                      handleCloseBtnClick={closeActiveModal}
                      handleCardDelete={handleCardDelete}
                    />

                    <EditProfileModal
                      isOpen={isEditProfileOpen}
                      onClose={() => setIsEditProfileOpen(false)}
                      onEditProfile={(data) =>
                        handleEditProfile(data, currentUser, setCurrentUser)
                      }
                    />

                    <AuthModalsWrapper
                      isRegisterOpen={isRegisterOpen}
                      isLoginOpen={isLoginOpen}
                      closeRegister={closeRegister}
                      closeLogin={closeLogin}
                      openRegister={openRegister}
                      openLogin={openLogin}
                      onRegister={async (data) => {
                        try {
                          await register(data);
                          const res = await login({
                            email: data.email,
                            password: data.password,
                          });
                          localStorage.setItem("jwt", res.token);
                          const userData = await checkToken(res.token);
                          login(userData, res.token);
                          closeRegister();
                        } catch (err) {
                          console.error("Registration/Login failed", err);
                        }
                      }}
                      onLogin={async ({ email, password }) => {
                        try {
                          const res = await login({ email, password });
                          localStorage.setItem("jwt", res.token);
                          const userData = await checkToken(res.token);
                          login(userData, res.token);
                          closeLogin();
                        } catch (err) {
                          console.error("Login failed", err);
                        }
                      }}
                    />

                    <Footer />
                  </>
                )}
              </div>
            </div>
          </CurrentTemperatureUnitContext.Provider>
        )}
      </CurrentUserContext.Consumer>
    </CurrentUserProvider>
  );
}

export default App;
