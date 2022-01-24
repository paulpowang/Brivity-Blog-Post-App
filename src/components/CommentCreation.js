import React from "react";
import { useRef, useContext } from "react/cjs/react.development";
import { UserContext } from "../context/UserContext";
import { addCommentApi } from "../api/commentApi";
function CommentCreation({ post_id, setComments }) {
  const contentInput = useRef();
  const { userAuth } = useContext(UserContext);

  const onAddCommentClick = () => {
    const comment = {
      comment: {
        post_id: post_id,
        content: contentInput.current.value,
      },
    };
    addCommentApi(comment, userAuth, post_id, setComments);
    onCancelClick();
  };

  const onCancelClick = () => {
    contentInput.current.value = "";
  };
  return (
    <div className="mt-3 text-sm">
      <input
        ref={contentInput}
        placeholder="Comment..."
        className="mb-2 w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10"
      />
      <div className="flex justify-end">
        <button
          className="px-2 bg-sky-500 p-1 rounded-lg text-white hover:bg-sky-400 mr-3"
          onClick={onAddCommentClick}
        >
          Add Comment
        </button>
        <button
          className="px-2 bg-slate-500 p-1 rounded-lg text-white hover:bg-slate-400"
          onClick={onCancelClick}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default CommentCreation;
