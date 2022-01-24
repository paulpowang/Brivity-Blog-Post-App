import { createContext, useState } from "react";
import { useEffect } from "react/cjs/react.development";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [curUser, setCurUser] = useState();
  const [isCreatePost, setIsCreatePost] = useState(false);
  const [userAuth, setUserAuth] = useState();

  useEffect(() => {
    const storeLoginUser = JSON.parse(localStorage.getItem("BrivityLoginUser"));
    console.log(storeLoginUser);
    if (storeLoginUser) {
      setCurUser(storeLoginUser.storedUser);
      setUserAuth(storeLoginUser.storedAuth);
    }
  }, []);

  const defaultValue = {
    curUser,
    setCurUser,
    isCreatePost,
    setIsCreatePost,
    userAuth,
    setUserAuth,
  };

  return (
    <UserContext.Provider value={defaultValue}>{children}</UserContext.Provider>
  );
};
