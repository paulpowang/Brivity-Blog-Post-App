import React from "react";
import { useRef, useContext } from "react/cjs/react.development";
import { UserContext } from "../context/UserContext";
function CommentCreation({ post_id }) {
  const contentInput = useRef();
  const { userAuth } = useContext(UserContext);

  const onAddCommentClick = () => {
    const comment = {
      comment: {
        post_id: post_id,
        content: contentInput.current.value,
      },
    };
    addCommentApi(comment);
    onCancelClick();
  };
  const addCommentApi = async (comment) => {
    const url = "https://brivity-react-exercise.herokuapp.com/comments";
    try {
      const respond = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          authorization: userAuth,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(comment), // body data type must match "Content-Type" header
      });
      const data = await respond.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const onCancelClick = () => {
    contentInput.current.value = "";
  };
  return (
    <div>
      <input ref={contentInput} placeholder="Comment..." />
      <button
        className="px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400"
        onClick={onAddCommentClick}
      >
        Add Comment
      </button>
      <button
        className="px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400"
        onClick={onCancelClick}
      >
        Cancel
      </button>
    </div>
  );
}

export default CommentCreation;
