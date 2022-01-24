import React, { useContext } from "react";

import { UserContext } from "../context/UserContext";

function Post({
  id,
  title,
  body,
  created_at,
  updated_at,
  comment_count,
  user,
}) {
  const { curUser, userAuth } = useContext(UserContext);
  const deletePostApi = async (postId) => {
    const hostUrl = "https://brivity-react-exercise.herokuapp.com/";
    const url = hostUrl + `posts/${postId}`;
    try {
      await fetch(url, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          authorization: userAuth,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border-solid border-2 border-indigo-600 hover:border-amber-600 rounded-lg mt-10 mx-5 p-5 last:mb-5 hover:cursor-pointer">
      <div className="flex justify-between">
        <p className="text-lg font-bold">{title}</p>
        <p className="text-sm">
          Post by: <span className="font-bold">{user.display_name}</span>
        </p>
      </div>
      <p className="my-5">{body}</p>
      <div className="flex justify-between ">
        <p className="text-sm">created at: {created_at}</p>
        <p className="text-sm">last update: {updated_at}</p>
      </div>
      <p className="text-sm">Comments: {comment_count}</p>
      {user.id === curUser.id && (
        <div className="flex justify-end">
          <button className="mr-3">Edit</button>
          <button onClick={() => deletePostApi(id)}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default Post;
