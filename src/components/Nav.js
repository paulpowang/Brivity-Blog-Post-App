import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { BrivityLoginUser } from "../constants";

function Nav() {
  const { curUser, setIsCreatePost, setCurUser, setUserAuth } =
    useContext(UserContext);
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem(BrivityLoginUser);
    setCurUser(undefined);
    setUserAuth(undefined);
    navigate("/", { replace: true });
  };

  return (
    <div className="w-full bg-sky-500 py-5 px-20  flex justify-between text-lg font-bold text-white sticky top-0">
      <div className="flex">
        <p className="mr-3">Welcome, </p>
        <p className="">{curUser && curUser.display_name}</p>
      </div>
      <div className="flex">
        <p
          className="mr-10 hover:cursor-pointer hover:text-slate-300"
          onClick={() => {
            setIsCreatePost(true);
          }}
        >
          Create Post
        </p>
        <p
          className="hover:cursor-pointer hover:text-slate-300"
          onClick={() => {
            logoutUser();
          }}
        >
          Logout
        </p>
      </div>
    </div>
  );
}

export default Nav;
