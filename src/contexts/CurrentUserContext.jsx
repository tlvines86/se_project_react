import { createContext, useState, useEffect } from "react";
import { checkToken } from "../utils/auth";

const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setIsLoading(false);
      return;
    }

    checkToken(token)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        setCurrentUser(null);
        setIsLoggedIn(false);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("jwt", token);
    setCurrentUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isLoggedIn,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContext;
