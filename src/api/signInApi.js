import { hostUrl, BrivityLoginUser, HeaderBody } from "../constants";

export const signInApi = async (user, setCurUser, setUserAuth, navigate) => {
  const url = hostUrl + "users/sign_in";
  try {
    const response = await fetch(url, {
      ...HeaderBody,
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user), // body data type must match "Content-Type" header
    });

    const loginUserData = {
      storedUser: "",
      storedAuth: "",
    };
    for (var pair of response.headers.entries()) {
      if (pair[0] === "authorization") {
        loginUserData.storedAuth = pair[1];
        setUserAuth(pair[1]);
      }
    }
    const data = await response.json();
    loginUserData.storedUser = data;
    setCurUser(data);
    localStorage.setItem(BrivityLoginUser, JSON.stringify(loginUserData));
    navigate("/dashboard", { replace: true });
  } catch (error) {
    console.log(error);
  }
};

export const createUserApi = async (user) => {
  const url = hostUrl + "users";

  try {
    const respond = await fetch(url, {
      ...HeaderBody,
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user), // body data type must match "Content-Type" header
    });
    const data = await respond.json();

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
