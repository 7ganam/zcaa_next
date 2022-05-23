//login is just setting the token in the local storage followed by a request to /api/me to fetch user data-
//every time the application starts it fetches the user data from the api using the stored token
//the token stores only the user id which is used to fetch the user data from api/me
//logging out is simply removing the stored token and the global user object

import React, { useState } from "react";
import { createContext } from "react";
export const LoginContext = createContext();
import axios from "axios";

export const LoginContextProvider = ({ children }) => {
  const [IsLogInModalShown, setIsLogInModalShown] = useState(false);
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const [User, setUser] = useState();

  const ToggleLoginModal = () => {
    setIsLogInModalShown(!IsLogInModalShown);
  };

  const login = async (zcaaToken) => {
    try {
      localStorage.removeItem("userData");
      localStorage.setItem(
        "userData",
        JSON.stringify({
          token: zcaaToken,
        })
      );

      const user = await fetchUserData(zcaaToken);

      if (!user) {
        throw new Error("failed to fetch user");
      }
      setUser(user);
      setIsLoggedIn(true);
    } catch (error) {
      alert("failed to login");
      logout();
    }
  };

  const fetchUserData = async (zcaaToken) => {
    const response = await axios.get(`/api/users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${zcaaToken}`,
      },
    });
    let user = response?.data?.user || null;
    // eslint-disable-next-line no-console
    console.log(`logged out`);
    return user;
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("userData");
    // eslint-disable-next-line no-console
    console.log(`logged out`);
  };

  return (
    <LoginContext.Provider
      value={{
        IsLoggedIn,
        login,
        logout,
        ToggleLoginModal,
        IsLogInModalShown,
        User,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
