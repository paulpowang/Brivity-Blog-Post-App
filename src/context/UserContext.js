import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [curUser, setCurUser] = useState();
  const [isCreatePost, setIsCreatePost] = useState(false);
  const [userAuth, setUserAuth] = useState();

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
