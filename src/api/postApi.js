import { hostUrl, HeaderBody } from "../constants";

export const getPosts = async (setPosts, nextPage = 1) => {
  const url = hostUrl + "posts?page=" + nextPage;
  try {
    const res = await fetch(url);
    const data = await res.json();
    setPosts([...data.posts]);
  } catch (error) {
    console.log(error);
  }
};

export const createNewPostApi = async (post, userAuth, handleOnClose) => {
  const url = "https://brivity-react-exercise.herokuapp.com/posts";
  try {
    const respond = await fetch(url, {
      ...HeaderBody,
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        authorization: userAuth,
      },
      body: JSON.stringify(post), // body data type must match "Content-Type" header
    });
    const data = await respond.json();

    console.log(data);
    handleOnClose();
  } catch (error) {
    console.log(error);
  }
};

export const editPostApi = async (
  post,
  postToEdit,
  userAuth,
  handleOnClose
) => {
  const url = hostUrl + `posts/${postToEdit.id}`;
  try {
    const respond = await fetch(url, {
      ...HeaderBody,
      method: "PATCH", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        authorization: userAuth,
      },
      body: JSON.stringify(post), // body data type must match "Content-Type" header
    });
    const data = await respond.json();

    console.log(data);
    handleOnClose();
  } catch (error) {
    console.log(error);
  }
};

export const deletePostApi = async (postId, userAuth) => {
  const url = hostUrl + `posts/${postId}`;
  try {
    await fetch(url, {
      ...HeaderBody,
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        authorization: userAuth,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
