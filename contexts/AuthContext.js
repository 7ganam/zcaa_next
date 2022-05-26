//login is just setting the token in the local storage followed by a request to /api/me to fetch user data-
//every time the application starts it fetches the user data from the api using the stored token
//the token stores only the user id which is used to fetch the user data from api/me
//logging out is simply removing the stored token and the global user object

import React, { useState, useReducer } from "react";
import { createContext } from "react";
export const AuthContext = createContext();
import axios from "axios";

export const AuthContextProvider = ({ children }) => {
  const [IsLogInModalShown, setIsLogInModalShown] = useState(false);
  // const [IsLoggedIn, setIsLoggedIn] = useState(false);
  // const [User, setUser] = useState();

  const types = {
    SIGNUP_REQUEST: "SIGNUP_REQUEST",
    SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
    SIGNUP_FAILURE: "SIGNUP_FAILURE",

    LOGIN_REQUEST: "LOGIN_REQUEST",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAILURE: "LOGIN_FAILURE",

    FETCHUSER_REQUEST: "FETCHUSER_REQUEST",
    FETCHUSER_SUCCESS: "FETCHUSER_SUCCESS",
    FETCHUSER_FAILURE: "FETCHUSER_FAILURE",

    LOGOUT: "LOG_OUT",
  };

  const initialState = {
    user: null,
    zcaaToken: null, //the zcaa token is just the user object signed by zcaa backend. it's used to bypass the google auth step to save time.
    isSingingUp: false,
    signUpError: null,
    isLoggingIn: false,
    logInError: null,
    isFetching: false,
    FetchError: false,
  };

  const authReducer = (state, action) => {
    switch (action.type) {
      case types.SIGNUP_REQUEST:
        return {
          ...state,
          isSingingUp: true,
          signUpError: null,
        };
      case types.SIGNUP_SUCCESS:
        return {
          ...state,
          user: action.payload.user,
          zcaaToken: action.payload.zcaaToken,
          isSingingUp: false,
          signUpError: null,
        };
      case types.SIGNUP_FAILURE:
        return { ...state, isSingingUp: false, signUpError: action.payload };

      case types.LOGIN_REQUEST:
        return {
          ...state,
          isLoggingIn: true,
          logInError: null,
        };
      case types.LOGIN_SUCCESS:
        return {
          ...state,
          user: action.payload.user,
          zcaaToken: action.payload.zcaaToken,
          isLoggingIn: false,
          logInError: null,
        };
      case types.LOGIN_FAILURE:
        return { ...state, isLoggingIn: false, logInError: action.payload };

      case types.FETCHUSER_REQUEST:
        return {
          ...state,
          isFetching: true,
          FetchError: null,
        };
      case types.FETCHUSER_SUCCESS:
        return {
          ...state,
          user: action.payload.user,
          isFetching: false,
          FetchError: null,
        };
      case types.FETCHUSER_FAILURE:
        return { ...state, isFetching: false, FetchError: action.payload };

      case types.LOGOUT:
        return {
          ...state,
          user: null,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const actions = {
    signUpUser: async (formData, accessToken) => {
      dispatch({ type: types.SIGNUP_REQUEST });
      try {
        const response = await axios.post(
          `api/auth/signup`,
          { formData },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${accessToken}`,
            },
          }
        );

        updateLocalStorage(response.data.zcaaToken);

        dispatch({
          type: types.SIGNUP_SUCCESS,
          payload: {
            user: response.data.user,
            zcaaToken: response.data.zcaaToken,
          },
        });
      } catch (error) {
        if (error.response) {
          if (error.response.data.error === "already_applied_before") {
            alert("you already signed up before, your data was not updated");
          }

          dispatch({
            type: types.SIGNUP_FAILURE,
            payload: error.response.data.error,
          });
        } else {
          dispatch({
            type: types.SIGNUP_FAILURE,
            payload: "failed to signup",
          });
        }
      }
    },
    loginUser: async (accessToken) => {
      dispatch({ type: types.LOGIN_REQUEST });
      try {
        const response = await axios.post(
          `api/auth/login`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${accessToken}`,
            },
          }
        );

        updateLocalStorage(response.data.zcaaToken);

        dispatch({
          type: types.LOGIN_SUCCESS,
          payload: {
            user: response.data.user,
            zcaaToken: response.data.zcaaToken,
          },
        });
        closeLoginModal();
      } catch (error) {
        dispatch({ type: types.LOGIN_FAILURE, payload: "failed to login" });
      }
    },
    fetchUser: async (zcaaToken) => {
      dispatch({ type: types.FETCHUSER_REQUEST });
      try {
        const response = await axios.get(`api/users/me`, {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${zcaaToken}`,
          },
        });

        dispatch({
          type: types.FETCHUSER_SUCCESS,
          payload: {
            user: response.data.data,
          },
        });
      } catch (error) {
        dispatch({
          type: types.FETCHUSER_FAILURE,
          payload: "failed to fetch user",
        });
      }
    },
    logout: async () => {
      localStorage.removeItem("zcaaToken");
      dispatch({ type: types.LOGOUT });
    },
  };

  const updateLocalStorage = (token) => {
    localStorage.removeItem("zcaaToken");
    localStorage.setItem("zcaaToken", token);
  };

  const ToggleLoginModal = () => {
    setIsLogInModalShown(!IsLogInModalShown);
  };

  const closeLoginModal = () => {
    setIsLogInModalShown(false);
  };

  let IsLoggedIn = !!state.user;
  let User = state.user;

  return (
    <AuthContext.Provider
      value={{
        state,
        actions,
        IsLoggedIn,
        ToggleLoginModal,
        IsLogInModalShown,
        User,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
