import { createContext, useState, useEffect } from "react";

const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    setCurrentUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, isLoggedIn, login, logout }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContext;
