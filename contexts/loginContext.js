import React, { useState } from "react";
import { createContext } from "react";
export const LoginContext = createContext();

export const LoginContextProvider = ({ children }) => {
  const [IsLogInModalShown, setIsLogInModalShown] = useState(false);

  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const [Token, setToken] = useState();
  const [User, setUser] = useState();
  const [Expirateion_date_string, setExpirateion_date_string] = useState();

  const ToggleLoginModal = () => {
    setIsLogInModalShown(!IsLogInModalShown);
  };

  const login = (
    token,
    input_user,
    expirateion_date_string,
    setstorage = false
  ) => {
    setToken(token);
    setUser(input_user);
    setExpirateion_date_string(expirateion_date_string);

    if (setstorage) {
      localStorage.removeItem("userData"); // remove old if exist -> just to make sure the data is up to date -> this might be used to keep the data updated in case user data changed
      localStorage.setItem(
        "userData",
        JSON.stringify({
          user: input_user,
          token: token,
          expirateion_date_string: expirateion_date_string,
          //expiration: tokenExpirationDate.toISOString()
        })
      );
    }
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken(null);
    localStorage.removeItem("userData");
    console.log(`logout`);
  };

  return (
    <LoginContext.Provider
      value={{
        IsLoggedIn,
        login,
        logout,
        Token,
        ToggleLoginModal,
        IsLogInModalShown,
        User,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
