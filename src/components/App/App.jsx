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
import { register, login as loginRequest, checkToken } from "../../utils/auth";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (request) => {
    setIsSubmitting(true);
    try {
      await request();
      closeActiveModal();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (data, login, closeRegister) => {
    try {
      await register(data);
      const res = await loginRequest({
        email: data.email,
        password: data.password,
      });
      if (!res?.token) throw new Error("No token received");

      localStorage.setItem("jwt", res.token);
      const userData = await checkToken(res.token);
      login(userData, res.token);
      closeRegister();
    } catch (err) {
      console.error("Registration/Login failed", err);
    }
  };

  const handleLoginSubmit = async ({ email, password }, login, closeLogin) => {
    try {
      const res = await loginRequest({ email, password });
      if (!res?.token) throw new Error("No token received");

      localStorage.setItem("jwt", res.token);
      const userData = await checkToken(res.token);
      login(userData, res.token);
      closeLogin();
    } catch (err) {
      console.error("Login failed", err);
    }
  };

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

  const handleAddItemModalSubmit = (item) => {
    handleSubmit(async () => {
      const token = localStorage.getItem("jwt");
      const newItem = await apiAddItem({ ...item, token });
      const normalizedItem = {
        ...newItem,
        imageUrl: newItem.link || newItem.imageUrl,
      };
      setClothingItems((prev) => [normalizedItem, ...prev]);
    });
  };

  const handleCardDelete = (idToDelete) => {
    handleSubmit(async () => {
      const token = localStorage.getItem("jwt");
      await apiDeleteCard(idToDelete, token);
      setClothingItems((prev) =>
        prev.filter((item) => item._id !== idToDelete)
      );
    });
  };

  const handleEditProfile = ({ name, avatar }, currentUser, setCurrentUser) => {
    handleSubmit(async () => {
      const updatedUser = await updateUserProfile(name, avatar);
      setCurrentUser(updatedUser);
      setIsEditProfileOpen(false);
    });
  };

  useEffect(() => {
    setIsLoading(true);
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
                            isLoggedIn={isLoggedIn}
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
                              isLoggedIn={isLoggedIn}
                            />
                          </ProtectedRoute>
                        }
                      />
                    </Routes>

                    <AddItemModal
                      isOpen={activeModal === "add-garment"}
                      handleCloseBtnClick={closeActiveModal}
                      onAddItemModalSubmit={handleAddItemModalSubmit}
                      isLoading={isSubmitting}
                    />

                    <ItemModal
                      activeModal={activeModal}
                      card={selectedCard}
                      handleCloseBtnClick={closeActiveModal}
                      handleCardDelete={handleCardDelete}
                      isLoading={isSubmitting}
                    />

                    <EditProfileModal
                      isOpen={isEditProfileOpen}
                      onClose={() => setIsEditProfileOpen(false)}
                      onEditProfile={(data) =>
                        handleEditProfile(data, currentUser, setCurrentUser)
                      }
                      isLoading={isSubmitting}
                    />

                    <AuthModalsWrapper
                      isRegisterOpen={isRegisterOpen}
                      isLoginOpen={isLoginOpen}
                      closeRegister={closeRegister}
                      closeLogin={closeLogin}
                      openRegister={openRegister}
                      openLogin={openLogin}
                      onRegister={(data) =>
                        handleRegisterSubmit(data, login, closeRegister)
                      }
                      onLogin={(data) =>
                        handleLoginSubmit(data, login, closeLogin)
                      }
                      isLoading={isSubmitting}
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
