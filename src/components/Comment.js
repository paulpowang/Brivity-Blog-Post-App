import React from "react";
import {
  useEffect,
  useRef,
  useState,
  useContext,
} from "react/cjs/react.development";
import { UserContext } from "../context/UserContext";

function Comment({
  id,
  content = "",
  created_at,
  updated_at,
  user,
  isAddCommentDisplay = false,
  post_id,
}) {
  const contentInput = useRef();
  const [isAddComment, setIsAddComment] = useState(false);
  const [isEditComment, setIsEditComment] = useState(false);
  const { curUser, userAuth } = useContext(UserContext);

  const onEditCommentClick = () => {
    const comment = {
      comment: {
        contents: contentInput.current.value,
      },
    };
    editCommentApi(comment);
  };
  const editCommentApi = async (comment) => {
    const url = "https://brivity-react-exercise.herokuapp.com/comment/" + id;
    try {
      const respond = await fetch(url, {
        method: "PATCH", // *GET, POST, PUT, DELETE, etc.
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
    if (isEditComment) {
      setIsEditComment(false);
    } else {
      contentInput.current.value = "";
    }
  };

  const handleDeleteOnClick = () => {
    deleteCommentApi(id);
  };

  const deleteCommentApi = async (commentId) => {
    const hostUrl = "https://brivity-react-exercise.herokuapp.com/";
    const url = hostUrl + `comments/${commentId}`;
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

  useEffect(() => {
    if (isEditComment) {
      contentInput.current.value = content;
    }
  }, []);
  return (
    <div>
      <p className="mr-5 font-bold">{user.display_name}</p>
      {curUser.id === user.id && (
        <div>
          <button>Edit</button>
          <button onClick={handleDeleteOnClick}>Delete</button>
        </div>
      )}

      <div className="flex border-solid border-2 border-indigo-600 hover:border-amber-600 rounded-lg p-3">
        <p>{content}</p>
      </div>
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
  );
}

export default Comment;
