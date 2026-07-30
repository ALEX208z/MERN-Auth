import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

axios.defaults.withCredentials = true;

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export const AppContextProvider = (props) => {

  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data");
      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");
      if (data.success) {
        setIsLoggedIn(true);
        const { data: userInfo } = await axios.get(backendUrl + "/api/user/data");
        if (userInfo.success) {
          setUserData(userInfo.userData);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

 // eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  getAuthState();
}, []);

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};