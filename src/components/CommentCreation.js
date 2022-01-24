import React from "react";
import { useRef, useContext } from "react/cjs/react.development";
import { UserContext } from "../context/UserContext";
import { addCommentApi } from "../api/commentApi";
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
    addCommentApi(comment, userAuth);
    onCancelClick();
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
