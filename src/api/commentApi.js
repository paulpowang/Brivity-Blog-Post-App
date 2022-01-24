import { hostUrl, HeaderBody } from "../constants";

export const getPostCommentsApi = async (postId, setComments) => {
  const url = hostUrl + `posts/${postId}/comments?page=1`;
  try {
    const res = await fetch(url);
    const data = await res.json();

    setComments(data.comments);
  } catch (error) {
    console.log(error);
  }
};

export const addCommentApi = async (comment, userAuth, postId, setComments) => {
  const url = hostUrl + "comments";
  try {
    const respond = await fetch(url, {
      ...HeaderBody,
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        authorization: userAuth,
      },
      body: JSON.stringify(comment), // body data type must match "Content-Type" header
    });
    const data = await respond.json();

    // refresh comments
    getPostCommentsApi(postId, setComments);

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const editCommentApi = async (
  comment,
  comment_id,
  userAuth,
  postId,
  setComments
) => {
  const url = hostUrl + "comments/" + comment_id;
  try {
    const respond = await fetch(url, {
      ...HeaderBody,
      method: "PATCH", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        authorization: userAuth,
      },
      body: JSON.stringify(comment), // body data type must match "Content-Type" header
    });
    const data = await respond.json();
    // refresh comments
    getPostCommentsApi(postId, setComments);

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteCommentApi = async (
  commentId,
  userAuth,
  postId,
  setComments
) => {
  const url = hostUrl + `comments/${commentId}`;
  try {
    await fetch(url, {
      ...HeaderBody,
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        authorization: userAuth,
      },
    });
    // refresh comments
    getPostCommentsApi(postId, setComments);
  } catch (error) {
    console.log(error);
  }
};
