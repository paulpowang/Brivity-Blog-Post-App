import React from "react";
import {
  useEffect,
  useRef,
  useState,
  useContext,
} from "react/cjs/react.development";
import { UserContext } from "../context/UserContext";
import { editCommentApi, deleteCommentApi } from "../api/commentApi";

function Comment({ id, content = "", user }) {
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
    editCommentApi(comment, id, userAuth);
    onCancelClick();
  };

  const onCancelClick = () => {
    setIsEditComment(false);
  };

  const handleEditOnClick = () => {
    setIsEditComment(true);
  };

  const handleDeleteOnClick = () => {
    deleteCommentApi(id, userAuth);
  };

  useEffect(() => {
    if (isEditComment) {
      contentInput.current.value = content;
    }
  }, [content, isEditComment]);
  return (
    <div>
      <p className="mr-5 font-bold">{user.display_name}</p>
      {curUser.id === user.id && (
        <div>
          <button onClick={() => handleEditOnClick(content)}>Edit</button>
          <button onClick={handleDeleteOnClick}>Delete</button>
        </div>
      )}
      {isEditComment ? (
        <div>
          <input ref={contentInput} type="text" placeholder="Comment..." />

          <button
            className="px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400"
            onClick={onEditCommentClick}
          >
            Edit Comment
          </button>
          <button
            className="px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400"
            onClick={onCancelClick}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex border-solid border-2 border-indigo-600 hover:border-amber-600 rounded-lg p-3">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
}

export default Comment;
