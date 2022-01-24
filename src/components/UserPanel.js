import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const menuOptions = ["Create Post", "My Posts", "Logout"];

function UserPanel() {
  const { curUser, setIsCreatePost, setCurUser, setUserAuth } =
    useContext(UserContext);
  const navigate = useNavigate();
  const handleOnClick = (option) => {
    switch (option) {
      case "Create Post":
        setIsCreatePost(true);
        break;

      case "My Posts":
        break;
      case "Logout":
        logoutUser();
        break;
      default:
        console.log("invalid menu option");
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("BrivityLoginUser");
    setCurUser(undefined);
    setUserAuth(undefined);
    navigate("/", { replace: true });
  };

  return (
    <div className="basis-1/4">
      <div className="p-10">
        <p className="text-2xl text-center mb-3 mt-10">Welcome</p>
        <p className="text-lg text-center font-bold">
          {curUser && curUser.display_name}
        </p>

        <ul className="p-6 divide-y divide-slate-200 mt-10">
          {menuOptions.map((option, index) => {
            return (
              <li key={index} className="flex py-4 first:pt-0 last:pb-0">
                <div className="flex justify-center  w-full hover:cursor-pointer">
                  <p
                    className="text-sm font-medium text-slate-900 hover:text-base text-bold "
                    onClick={() => handleOnClick(option)}
                  >
                    {option}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default UserPanel;
