import React from "react";
import {
  useEffect,
  useRef,
  useState,
  useContext,
} from "react/cjs/react.development";
import { UserContext } from "../context/UserContext";
import { editCommentApi, deleteCommentApi } from "../api/commentApi";

function Comment({ id, content = "", user, post_id, setComments }) {
  const contentInput = useRef();
  const [isEditComment, setIsEditComment] = useState(false);
  const { curUser, userAuth } = useContext(UserContext);

  const onEditCommentClick = () => {
    const comment = {
      comment: {
        contents: contentInput.current.value,
      },
    };
    console.log("comment", comment);
    editCommentApi(comment, id, userAuth, post_id, setComments);
    onCancelClick();
  };

  const onCancelClick = () => {
    setIsEditComment(false);
  };

  const handleEditOnClick = () => {
    setIsEditComment(true);
  };

  const handleDeleteOnClick = () => {
    deleteCommentApi(id, userAuth, post_id, setComments);
  };

  useEffect(() => {
    if (isEditComment) {
      contentInput.current.value = content;
    }
  }, [content, isEditComment]);
  return (
    <div className="text-sm mb-2">
      <p className="mr-5 font-bold text-base">{user.display_name}</p>
      {curUser.id === user.id && (
        <div className="flex justify-end mb-3">
          <button
            className="px-2 bg-sky-500 p-1 rounded-lg text-white hover:bg-sky-400 mr-2"
            onClick={() => handleEditOnClick(content)}
          >
            Edit
          </button>
          <button
            className="px-2 bg-red-500 p-1 rounded-lg text-white hover:bg-red-400"
            onClick={handleDeleteOnClick}
          >
            Delete
          </button>
        </div>
      )}
      {isEditComment ? (
        <div>
          <input
            className="mb-2 w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10"
            ref={contentInput}
            type="text"
            placeholder="Comment..."
          />

          <button
            className="px-2 bg-sky-500 p-1 rounded-lg text-white hover:bg-sky-400 mr-3"
            onClick={onEditCommentClick}
          >
            Save
          </button>
          <button
            className="px-2 bg-slate-500 p-1 rounded-lg text-white hover:bg-slate-400"
            onClick={onCancelClick}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex border-solid border-2 border-grey-500 hover:border-cyan-500 rounded-lg p-3">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
}

export default Comment;
