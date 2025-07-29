import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { coordinates, APIkey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";

import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";

import CurrentTempartureUnitContext from "../../contexts/CurrentTemeratureContext";

import { getItems, addItem, deleteCard } from "../../utils/api";

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

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddBtnClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = async ({ name, imageUrl, weather }) => {
    try {
      const newItemFromServer = await addItem({
        name,
        imageUrl,
        weather,
      });

      const normalizedItem = {
        ...newItemFromServer,
        imageUrl: newItemFromServer.imageUrl,
      };

      setClothingItems((prevItems) => [normalizedItem, ...prevItems]);
      closeActiveModal();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleCardDelete = async (idToDelete) => {
    try {
      await deleteCard(idToDelete);
      setClothingItems((prevItems) =>
        prevItems.filter((item) => item._id !== idToDelete)
      );
      closeActiveModal();
    } catch (error) {
      console.error("Failed to delete card:", error);
    }
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((renderedClothingItems) => {
        setClothingItems(renderedClothingItems);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  return (
    <CurrentTempartureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        {isLoading ? (
          <p>Loading weather data...</p>
        ) : (
          <div className="page__content">
            <Header
              handleAddBtnClick={handleAddBtnClick}
              weatherData={weatherData}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleAddBtnClick={handleAddBtnClick}
                  />
                }
              />
            </Routes>
          </div>
        )}
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
        <Footer />
      </div>
    </CurrentTempartureUnitContext.Provider>
  );
}

export default App;
